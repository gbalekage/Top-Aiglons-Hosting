import React from "react";
import { AnimatedGradientText } from "../ui/animatedText";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqsList = [
  {
    question: "Où se trouve TopAiglon ?",
    answer:
      "Le siège social de TopAiglons est situé à Goma, en RDC. Cela dit, nos services sont disponibles dans le monde entier. L’équipe du service client de TopAiglons est disponible dans plus de dix langues et est prête à vous aider 24h/24 et 7j/7.",
  },
  {
    question: "Comment puis-je payer un forfait TopAiglons ?",
    answer:
      "Yes, we take data privacy very seriously. All uploaded photos and generated images are encrypted and stored securely. We never share your personal data or images with third parties without your explicit consent.",
  },
  {
    question: "How many photos do I need to upload for best results?",
    answer:
      "For optimal results, we recommend uploading at least 10-20 diverse photos of yourself. This helps our AI model better understand your features and expressions, leading to more accurate and realistic generated images.",
  },
  {
    question: "Can I use Pictoria AI for commercial purposes?",
    answer:
      "Yes, our Pro and Enterprise plans include commercial usage rights for the images you generate. However, please note that you should always respect copyright and privacy laws when using AI-generated images.",
  },
  {
    question: "How often do you update the AI model?",
    answer:
      "We continuously work on improving our AI model. Major updates are typically released quarterly, with minor improvements and optimizations happening more frequently. All users benefit from these updates automatically.",
  },
  {
    question: "What are the differences between the free and paid plans?",
    answer:
      "The free plan allows you to generate up to 5 images per day. The Pro plan includes unlimited image generation, higher resolution output, and access to additional features. The Enterprise plan is tailored for businesses and offers custom integrations and dedicated support.",
  },
];

const Question = ({ question, answer }) => {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground py-2 text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const FaQ = () => {
  return (
    <div className="w-full bg-muted py-32 px-6 xs:px-8 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center overflow-hidden">
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-blue-400 via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          FAQ
        </span>
      </AnimatedGradientText>

      {/* Part Two */}
      <h2 className="text-2xl mt-4 xs:text-3xl sm:text-4xl font-extrabold leading-tight text-center text-gray-800 dark:text-white">
        Questions fréquemment posées
      </h2>
      <p className="text-base text-muted-foreground lg:max-w-[75%] mt-4 text-center">
        J'ai répondu à certaines questions fréquentes de nos clients pour vous
        aider
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mx-auto mt-16"
      >
        {faqsList.map((faq) => {
          return <Question key={faq.question} {...faq} />;
        })}
      </Accordion>
    </div>
  );
};

export default FaQ;
