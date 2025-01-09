import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";

const PopularDomains = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and move up
    visible: { opacity: 1, y: 0 }, // Fully visible at the original position
  };

  const domains = [
    {
      name: ".com",
      description: "Build trust with the best-known domain names.",
      originalPrice: "US$ 16.99",
      discount: "SAVE 71%",
      price: "US$ 4.99",
      buttonText: "Register",
    },
    {
      name: ".cloud",
      description: "Showcase your technology project with .cloud.",
      originalPrice: "US$ 19.99",
      discount: "SAVE 90%",
      price: "US$ 1.99",
      buttonText: "Register",
    },
    {
      name: ".shop",
      description: "Start selling products online with .shop.",
      originalPrice: "US$ 34.99",
      discount: "SAVE 97%",
      price: "US$ 0.99",
      buttonText: "Register",
    },
    {
      name: ".com",
      description: "Build trust with the best-known domain names.",
      originalPrice: "US$ 16.99",
      discount: "SAVE 71%",
      price: "US$ 4.99",
      buttonText: "Register",
    },
    {
      name: ".cloud",
      description: "Showcase your technology project with .cloud.",
      originalPrice: "US$ 19.99",
      discount: "SAVE 90%",
      price: "US$ 1.99",
      buttonText: "Register",
    },
    {
      name: ".shop",
      description: "Start selling products online with .shop.",
      originalPrice: "US$ 34.99",
      discount: "SAVE 97%",
      price: "US$ 0.99",
      buttonText: "Register",
    },
  ];

  return (
    <div className="w-full py-12 mt-[6rem]">
      <div className="container mx-auto px-6 sm:px-12">
        <AnimatedGradientText className="bg-background backdrop-blur-0 mb-8">
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Domains Populaire
          </span>
        </AnimatedGradientText>
        <h2 className="text-2xl text-center mt-4 xs:text-3xl sm:text-4xl font-bold">
          Noms de domaines les plus populaires
        </h2>
        <p className="text-base mx-auto mb-4 text-muted-foreground lg:max-w-[75%] mt-4 text-center">
          Choisissez parmi les meilleures options pour votre site web et donnez
          une identité unique à votre projet
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5rem] gap-8">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 shadow-md rounded-lg p-6 text-center bg-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={cardVariants}
            >
              <h3 className="text-2xl font-bold">
                {domain.name}
              </h3>
              <p className="text-gray-600 mt-2">{domain.description}</p>
              <div className="mt-4">
                <span className="text-sm line-through text-gray-400">
                  {domain.originalPrice}
                </span>
                <span className="text-sm text-blue-500 font-bold ml-2">
                  {domain.discount}
                </span>
              </div>
              <div className="text-3xl font-bold text-black mt-2">
                {domain.price}
                <span className="text-base text-gray-500">/year</span>
              </div>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full mt-4">
                {domain.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDomains;
