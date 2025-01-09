import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const socialMedia = [
  {
    icon: <FaFacebook />,
    link: "https://www.facebook.com/",
  },
  {
    icon: <FaTwitter />,
    link: "https://www.x.com/",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/",
  },
  {
    icon: <FaGithub />,
    link: "https://www.github.com/",
  },
];

const Footter = () => {
  return (
    <footer className="container mt-20 mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full items-center border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} TopAiglons. Tous droits réservés
      </p>
      <nav className="sm:ml-auto gap-6 flex sm:gap-6">
        <div className="gap-4">
          <Link to="/conditions" className="text-xs mr-6 hover:underline underline-offset-4">
            Conditions d'utilisation
          </Link>
          <Link to="/pricacy" className="text-xs hover:underline underline-offset-4">
            Politique de confidentialité
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {socialMedia.map((media, index) => (
            <Link
              key={index} // Add a unique key here (index or link)
              className="bg-black text-white p-2 items-center rounded-full"
              to={media.link}
              target="_blank"
            >
              {media.icon}
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default Footter;
