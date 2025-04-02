
import { useState } from "react";
import { DocumentationSidebar, Section } from "../components/documentation/DocumentationSidebar";
import { DocumentationContent } from "../components/documentation/DocumentationContent";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState<string>("instalacion");

  const sections: Section[] = [
    { id: "instalacion", title: "Instalación" },
    { id: "elementos", title: "Creación de elementos" },
    { id: "manipulacion", title: "Manipulación DOM" },
    { id: "eventos", title: "Eventos" },
    { id: "http", title: "HTTP" },
    { id: "utilidades", title: "Utilidades" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DocumentationSidebar 
        sections={sections} 
        activeSection={activeSection} 
        onSectionChange={scrollToSection} 
      />
      <main className="flex-1 p-6 md:p-8 lg:p-10 bg-white">
        <DocumentationContent />
      </main>
    </div>
  );
};

export default Documentation;
