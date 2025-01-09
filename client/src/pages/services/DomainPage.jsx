import CardGrid from "@/components/domains/CardGrid";
import Hero from "@/components/domains/Hero";
import PopularDomains from "@/components/domains/PopularDomains";
import React, { useEffect } from "react";

const DomainPage = () => {
  useEffect(() => {
    document.title = "Nom de domain - TopAiglons";
  }, []);

  return (
    <>
      <Hero />
      <PopularDomains />
      <CardGrid />
    </>
  );
};

export default DomainPage;
