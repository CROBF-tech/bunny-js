
import { InstallationSection } from "./InstallationSection";
import { ElementsSection } from "./ElementsSection";
import { ManipulationSection } from "./ManipulationSection";
import { EventsSection } from "./EventsSection";
import { HttpSection } from "./HttpSection";
import { UtilitiesSection } from "./UtilitiesSection";

export const DocumentationContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-bunny-black mb-8">
        Documentación de bunny
      </h1>
      <p className="text-gray-700 mb-12 text-lg">
        Bienvenido a la documentación oficial de bunny. Aquí encontrarás todo lo que necesitas para comenzar a utilizar esta librería JavaScript minimalista para interactuar con el DOM de manera sencilla.
      </p>

      <InstallationSection />
      <ElementsSection />
      <ManipulationSection />
      <EventsSection />
      <HttpSection />
      <UtilitiesSection />
    </div>
  );
};
