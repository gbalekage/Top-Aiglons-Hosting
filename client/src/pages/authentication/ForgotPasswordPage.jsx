import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa"; // Importing icons from react-icons
import useAuthStore from "@/store/authStore";
import { Check } from "lucide-react";

const ForgotPasswordPage = () => {
  useEffect(() => {
    document.title = "Mot de passe oublié - TopAiglons";
  }, []);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword, error } = useAuthStore();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
          <h1 className="text-2xl font-semibold tracking-tighter dark:text-white">
            Mot de passe oublié
          </h1>

          {!isSubmitted ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation.
              </p>  
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Adresse email"
                  className="border px-3 py-2 focus:outline-none bg-transparent dark:bg-black dark:border-gray-600 w-full placeholder:text-gray-500 text-[0.9rem]"
                  required
                />
                <button
                  type="submit"
                  className={`w-full px-4 py-2 text-white bg-black rounded-full shadow-md ${
                    isLoading ? "bg-gray-400" : "bg-primary"
                  } transition duration-300`}
                  disabled={isLoading}
                  aria-label="Envoyer demande de réinitialisation"
                >
                  {isLoading ? (
                    <div className="flex justify-center">Chargement...</div>
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check />
              </motion.div>
              <p className="text-gray-500 mb-6">
                Un email avec des instructions pour réinitialiser votre mot de
                passe vous a été envoyé. Veuillez vérifier votre boîte de
                réception.
              </p>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm text-[0.7rem] font-semibold">
              {error}
            </p>
          )}
          <div className="text-gray-500 text-sm">
            <Link to="/login" className="hover:underline">
              Connexion
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
