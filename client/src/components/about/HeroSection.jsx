import React from "react";
import Imge from "../../assets/automation.jpeg";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Delay for staggered animation
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
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

          <motion.h1
            custom={0}
            variants={childVariants}
            className="text-5xl mt-10 lg:text-7xl font-semibold tracking-tighter mb-6"
          >
            À propos de TopAiglons
          </motion.h1>
          <motion.p
            custom={1}
            variants={childVariants}
            className="mx-auto max-w-2xl text-lg mb-8 text-gray-700"
          >
            Chez TopAiglons, nous nous engageons à fournir des solutions
            numériques innovantes pour nos clients. Notre objectif est de vous
            aider à propulser votre entreprise vers l'avenir avec des outils et
            des services de qualité.
          </motion.p>
          <motion.div custom={2} variants={childVariants}>
            <button className="bg-black rounded-full text-white transition duration-300 px-9 py-2 text-sm hover:bg-gray-800">
              Contactez-nous
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
