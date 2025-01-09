import React from "react";

const cardData = [
  {
    title: "Keep it short",
    description:
      "While there is no minimum length for domain registration, we recommend buying a domain name that’s under three words long. Longer website names are harder to read and won't stand out.",
    icon: "🔤", // Replace with an appropriate icon
  },
  {
    title: "Less is more",
    description:
      "Avoid hyphens, numbers, slang, and easily misspelled words in your domains. Complex elements make website names much harder to reach and remember.",
    icon: "➖", // Replace with an appropriate icon
  },
  {
    title: "Include your brand name",
    description:
      "A great address for your website should include your brand or the target keywords for your niche. It helps with better brand recognition and increased traffic.",
    icon: "🏷️", // Replace with an appropriate icon
  },
  {
    title: "Domain Availability Search",
    description:
      "Start by doing a domain name search to check if a domain name is available. Remember to also check it has not been trademarked.",
    icon: "🔍", // Replace with an appropriate icon
  },
  {
    title: "Think locally",
    description:
      "While it’s ideal to purchase a website name with .com, consider registering a country-specific extension like .co.uk or .us if you target a particular country.",
    icon: "📍", // Replace with an appropriate icon
  },
  {
    title: "Act Fast",
    description:
      "The best website names are quickly taken. Do a domain search and buy your domain today to secure the perfect one.",
    icon: "⚡", // Replace with an appropriate icon
  },
];

const Card = ({ title, description, icon }) => (
  <div className="p-6 text-center">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-purple-100 p-4 rounded-full">
        <span className="text-purple-600 text-3xl">{icon}</span>
      </div>
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const CardGrid = () => (
  <div className="bg-black text-white py-12 mt-[6rem]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-extrabold text-white mb-8">
        6 Things To Remember Before You Buy Domains
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  </div>
);

export default CardGrid;
