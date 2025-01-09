import HeroSection from "@/components/about/HeroSection";
import Services from "@/components/about/AaboutUs";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Apropos - TopAiglons";
  }, []);
  return (
    <>
      <HeroSection />
      <Services />
    </>
  );
};

export default AboutPage;
