import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="w-full mt-16 py-16 bg-black">
      <div className="container px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-2xl text-white mt-4 xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Prêt à mettre votre entreprise en ligne ?
          </h2>
          <p className="text-base text-muted-foreground lg:max-w-[80%] mt-4 text-center sm:text-lg md:text-xl">
            Rejoignez des milliers d'entreprises déjà en ligne
          </p>
          <Link
            className="bg-white rounded-full text-black hover:bg-white/80 dark:hover:bg-white/60 dark:bg-white dark:text-black transition duration-300 px-10 py-3 text-sm md:text-base"
            to="/pricing"
          >
            Commencer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
