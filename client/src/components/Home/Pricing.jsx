import React from "react";
import { motion } from "framer-motion";
import { PLANS_CONTENT } from "@/constants";

const Pricing = () => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Adjusted delay for a smoother effect
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-gradient-to-r from-pink-100 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl mt-4 xs:text-3xl sm:text-4xl font-bold">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez ce que nos clients disent de nos services
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
          {PLANS_CONTENT.plans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={childVariants}
              className={`p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                plan.popular ? "border border-black" : "border-gray-300 border"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-black text-white text-xs py-1 px-3 rounded-full uppercase">
                    {PLANS_CONTENT.popularBadge}
                  </span>
                </div>
              )}
              <h3 className="text-lg lg:text-xl mb-4 tracking-tighter uppercase font-semibold">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="text-2xl lg:text-3xl font-bold mb-6">
                {plan.price}
              </div>
              <ul className="mb-8 space-y-2 text-muted-foreground">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-black w-full rounded-full text-white transition duration-300 px-9 py-2 text-sm hover:bg-gray-800">
                {PLANS_CONTENT.ctaText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
