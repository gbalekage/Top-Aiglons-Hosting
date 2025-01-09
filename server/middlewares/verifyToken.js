const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Non autorisé, jeton manquant" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.userId = decoded.userId;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expirée, veuillez vous reconnecter",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Non autorisé, jeton invalide",
    });
  }
};

module.exports = verifyToken;
