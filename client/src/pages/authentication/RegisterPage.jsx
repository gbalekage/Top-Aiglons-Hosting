import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa"; // Importing icons from react-icons
import useAuthStore from "@/store/authStore";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Créer un compte - TopAiglons";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const { register, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, password2);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
    // Add GitHub login logic here
  };

  return (
    <div className="h-screen flex items-center justify-center dark:bg-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full p-6 bg-white dark:bg-gray-800"
      >
        <div className="space-y-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Créer un compte
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fournissez vos identifiants pour créer un compte
          </p>

          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full max-w-md flex rounded-full items-center justify-center px-4 py-2 border  bg-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Continuer avec Google
            </button>
            <button
              onClick={handleGitHubLogin}
              className="w-full max-w-md flex rounded-full items-center justify-center px-4 py-2 border  bg-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              Continuer avec GitHub
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t dark:border-gray-600"></div>
            </div>
            <div className="relative text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2">
              Ou inscrivez-vous avec votre email
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full max-w-md placeholder:text-gray-500 text-[0.9rem]"
            />
            <input
              type="email"
              placeholder="Votre adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full max-w-md placeholder:text-gray-500 text-[0.9rem]"
            />
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full max-w-md placeholder:text-gray-500 text-[0.9rem]"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full max-w-md placeholder:text-gray-500 text-[0.9rem]"
            />
            <button
              type="submit"
              className={`w-full max-w-md px-4 py-2 text-white rounded-full bg-black shadow-md ${
                isLoading ? "bg-gray-400" : "bg-primary"
              } transition duration-300`}
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "S'inscrire"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          <div className="text-gray-500 text-sm">
            <Link to="/login" className="hover:underline">
              Vous avez déjà un compte ?
            </Link>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            En cliquant sur "S'inscrire", vous acceptez notre{" "}
            <Link
              to="/terms-and-conditions"
              className="hover:underline text-blue-500"
            >
              politique de confidentialité et nos conditions de service.
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
