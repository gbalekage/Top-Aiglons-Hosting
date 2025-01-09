import React from "react";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center"
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Bienvenue sur TopAiglons 🚀
          </span>
        </AnimatedGradientText>
        <h1 className="text-5xl lg:text-8xl my-4 font-semibold tracking-tighter">
          L'excellence numérique avec Top Aiglons
        </h1>
        <p className="mx-auto max-w-2xl text-sm mb-8">
          TopAiglons est votre solution complète pour tous vos besoins
          numériques. Que vous soyez une entreprise en pleine croissance.
        </p>
        <div>
          <Link
            to="/pricing"
            className="bg-black rounded-full text-white transition duration-300 px-9 py-2 text-sm"
          >
            Commencer
          </Link>
        </div>
      </motion.div>

      <div className="absolute top-0 w-full grid grid-cols-6 z-10"></div>
      <div clas></div>
    </section>
  );
};

export default HeroSection;
