import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";

const ResetPasswordPage = () => {
  useEffect(() => {
    document.title = "Réinitialiser le mot de passe - TopAiglons";
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword, error, isLoading, message } = useAuthStore();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success(
        "your password has been upated successfully, redirection to home page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error reseting password");
    }
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
            Réinitialiser le mot de passe
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Modifier votre mot de passe
          </p>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full placeholder:text-gray-500 text-[0.9rem]"
              required
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border px-3 py-2 focus:outline-none bg-transparent rounded-sm dark:bg-black dark:border-gray-600 w-full placeholder:text-gray-500 text-[0.9rem]"
              required
            />
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-full bg-black shadow-md ${
                isLoading ? "bg-gray-400" : "bg-primary"
              } transition duration-300`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center">Chargement...</div>
              ) : (
                "Modifier"
              )}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-[0.7rem] font-semibold">
              {error}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
