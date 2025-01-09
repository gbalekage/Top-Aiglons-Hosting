import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import useDomainStore from "@/store/domainStore";

const Hero = () => {
  const {
    domain,
    isAvailable,
    isLoading,
    message,
    error,
    setDomain,
    checkDomainAvailability,
    registerDomain,
  } = useDomainStore();

  const handleCheckDomain = (e) => {
    e.preventDefault();
    if (!domain.trim()) return alert("Please enter a domain name.");
    checkDomainAvailability(domain);
  };

  const handleRegisterDomain = (e) => {
    e.preventDefault();
    if (isAvailable) {
      registerDomain(domain);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-pink-100 to-pink-50 flex flex-col items-center justify-center text-black px-4">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <AnimatedGradientText className="mb-5">
            <span
              className={cn(
                "inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-clip-text text-transparent"
              )}
            >
              Nom de domaines
            </span>
          </AnimatedGradientText>
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-5xl w-full max-w-4xl mx-auto mb-2">
            Recherchez et achetez un domaine en quelques minutes
          </h1>
          <p className="text-lg text-muted-foreground mt-7">
            Utilisez notre outil de vérification <br /> de domaine pour trouver le nom
            parfait pour votre site en ligne. 
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleCheckDomain}
          className="flex items-center w-full max-w-2xl mt-8 border border-muted-foreground rounded-md p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Enter your desired domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-grow px-4 py-2 bg-transparent text-black rounded-sm outline-none"
            aria-label="Domain name"
          />
          <button
            className="px-6 py-2 bg-black rounded-sm hover:bg-gray-800 transition text-white"
            type="submit"
            disabled={isLoading}
            aria-label="Check domain availability"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <p>Vérification ...</p>
              </div>
            ) : (
              "Vérifiez la disponibilité"
            )}
          </button>
        </motion.form>

        {/* Error or Message */}
        {error && <p className="text-red-500 mt-4">Erreur: {error}</p>}
        {message && (
          <p
            className={`mt-4 ${
              isAvailable ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Domain Availability Section */}
        {isAvailable && (
          <div className="bg-gray-100 p-6 mt-8 rounded-lg shadow-lg text-center">
            <p className="text-lg text-muted-foreground">
              Le domaine{" "}
              <span className="font-bold text-green-700">{domain}</span> est
              disponible!
            </p>
            <button
              onClick={handleRegisterDomain}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              disabled={isLoading}
            >
              {isLoading
                ? "Redirection vers le paiement..."
                : "Enregistrez le domaine"}
            </button>
          </div>
        )}

        {/* Footer Text */}
        {/* <p className="text-sm mt-4">
          Free WHOIS privacy protection is included with every eligible domain
          registration.
        </p>
        <p className="mt-2">
          Already bought a domain?{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            Transfer it
          </a>
        </p> */}

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-[10rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {[
            { tld: ".com", oldPrice: "16.99", newPrice: "4.99" },
            { tld: ".online", oldPrice: "34.99", newPrice: "1.99" },
            { tld: ".shop", oldPrice: "34.99", newPrice: "0.99" },
            { tld: ".pro", oldPrice: "24.99", newPrice: "2.99" },
            { tld: ".net", oldPrice: "15.99", newPrice: "11.99" },
            { tld: ".xyz", oldPrice: "13.99", newPrice: "1.99" },
          ].map(({ tld, oldPrice, newPrice }) => (
            <motion.div
              key={tld}
              className="rounded-md p-[4rem] cursor-pointer hover:shadow-xl transition duration-300 text-center text-black border border-muted-foregroundr"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="text-5xl mb-2 font-bold">{tld}</p>
              <p className="text-sm line-through">US$ {oldPrice}</p>
              <p className="text-lg font-semibold">US$ {newPrice}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
