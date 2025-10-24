import { useState } from "react";
import { Header } from "@/components/Header";
import { OfficialStems } from "@/components/OfficialStems";
import { CustomStems } from "@/components/CustomStems";
import { Contact } from "@/components/Contact";

const Index = () => {
  const [activeSection, setActiveSection] = useState("official");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main className="pt-16">
        <div id="official">
          <OfficialStems />
        </div>
        
        <div id="custom">
          <CustomStems />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default Index;
