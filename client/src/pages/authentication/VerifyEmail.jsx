import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  useEffect(() => {
    document.title = `Vérification du compte`;
  }, []);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/dashboard");
      toast.success("The email has been verified successfylly");
    } catch (error) {}
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

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
            Vérifiez votre email
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Un e-mail a été envoyé avec un code de vérification à{" "}
            <span className="font-bold">{user.email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-transparent text-black dark:text-white border-2 focus:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-full bg-black shadow-md"
            >
              {isLoading ? "Verification..." : "Vérifier"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
