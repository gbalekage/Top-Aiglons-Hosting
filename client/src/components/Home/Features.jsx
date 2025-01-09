import React from "react";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import { Server, Globe, Palette, Code } from "lucide-react";
import dashboardImg from "../../assets/dashboard-img.png";

const featuresList = [
  {
    title: "Hébergement Web",
    description:
      "Proposez des solutions d’hébergement fiables et évolutives, adaptées aux besoins des particuliers et des entreprises. Offrez des options comme l’hébergement partagé, VPS, ou dédié, avec des outils de gestion via cPanel.",
    icon: <Server />,
  },
  {
    title: "Enregistrement et Gestion de Noms de Domaines",
    description:
      "Permettez aux utilisateurs de rechercher, enregistrer, transférer et gérer leurs noms de domaine facilement. Incluez des fonctionnalités pour vérifier la disponibilité des domaines et des outils d’administration avancés.",
    icon: <Globe />,
  },
  {
    title: "Design Graphique Personnalisé",
    description:
      "Offrez des services professionnels de création graphique, incluant le design de logos, bannières, maquettes UI/UX, et plus encore. Des solutions sur mesure adaptées à l'identité de la marque.",
    icon: <Palette />,
  },
  {
    title: "Développement Full Stack",
    description:
      "Proposez des services de développement web complets, du frontend au backend, avec des solutions modernes et sécurisées pour les applications web et mobiles. Soutien pour des technologies populaires comme React, Node.js, MongoDB, et bien d'autres.",
    icon: <Code />,
  },
];

const Features = () => {
  return (
    <div className="w-full bg-muted py-32 flex-col items-center justify-center">
      <div className="container px-6 xs:px-8 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2  gap-8 relative bg-muted">
        {/* part one */}
        <div className="col-span-full space-y-4">
          <AnimatedGradientText className="ml-0 bg-background backdrop-blur-0">
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Nos fonctionnalités
            </span>
          </AnimatedGradientText>

          {/* part two */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold">
            Nous vous faisons apparaître en ligne🚀
          </h2>
          <p className="text-base text-muted-foreground lg:max-w-[75%]">
            TopAiglons est votre solution complète pour tous vos besoins
            numériques. Que vous soyez une entreprise en pleine croissance, une
            startup ambitieuse ou un particulier à la recherche de services
            professionnels, nous avons tout ce qu’il vous faut pour réussir en
            ligne.
          </p>
        </div>
        <div className="flex flex-col justify-start items-start order-2 lg:order-1">
          {featuresList.map((feature) => {
            return (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-lg p-4"
              >
                <span className="p-2 rounded-md text-background bg-foreground">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">{feature.title}</h3>
                  <p className="text-sm xs:text-base text-muted-foreground pt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* img */}
        <div
          className={cn(
            "h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fba] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2"
          )}
        >
          <img src={dashboardImg} alt="Feature Img" className="w-full h-auto rounded-tl-lg" />
        </div>
      </div>
    </div>
  );
};

export default Features;
