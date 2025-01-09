const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const { sendVerificationCode, sendForgotEmail } = require("../mails/mail");
const crypto = require("crypto");

const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  try {
    if (!name || !email || !password || !password2) {
      return res
        .status(400)
        .json({ success: false, message: "Tous les champs sont requis" });
    }

    const newEmail = email.toLowerCase();

    const dbUser = await User.findOne({ email: newEmail });
    if (dbUser) {
      return res
        .status(400)
        .json({ success: false, message: "L'utilisateur existe déjà" });
    }

    if (password !== password2) {
      return res.status(400).json({
        success: false,
        message: "Les mots de passe ne correspondent pas",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      password: hashedPass,
      email: newEmail,
      verificationCode: code,
      verificationCodeExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    await user.save();

    // generate and set the token
    generateToken(res, user._id);

    // Send email with verification code
    await sendVerificationCode(user.email, code);

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    console.log("Code de vérification reçu:", code);

    const user = await User.findOne({
      verificationCode: code,
      verificationCodeExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Code invalide ou expiré" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Compte vérifié",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Erreur de vérification :", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Identifiants invalides" });
    }

    const dbPass = await bcrypt.compare(password, user.password);
    if (!dbPass) {
      return res
        .status(400)
        .json({ success: false, message: "Mot de passe incorrect" });
    }

    generateToken(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Connecté avec succès",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(
      "Erreur lors de la connexion de l'utilisateur:",
      error.message
    );
    return res.status(400).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 heure
    const resetURL = `${process.env.CLIENT_URL}reset-password/${resetPasswordToken}`;

    user.resetPassword = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
    await user.save();

    await sendForgotEmail(user.email, resetURL);

    res.status(200).json({
      success: true,
      message: `Le lien de réinitialisation a été envoyé à ${user.email}`,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe:",
      error.message
    );
    return res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPassword: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Lien de réinitialisation invalide ou expiré",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user.password = hashedPass;
    user.resetPassword = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Le mot de passe a été réinitialisé avec succès",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe:",
      error.message
    );
    return res.status(400).json({ success: false, message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Déconnecté avec succès" });
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  checkAuth,
  logout,
};
