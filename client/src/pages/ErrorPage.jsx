import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Non Trouvée</h2>
      <p className="text-sm mt-2 text-gray-600">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="mt-4 bg-black rounded-full text-white dark:hover:bg-white/60 dark:bg-white dark:text-black transition duration-300 px-9 py-2 text-sm"
      >
        Retour à l'Accueil
      </a>
    </div>
  );
};

export default ErrorPage;
