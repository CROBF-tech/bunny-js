
import { InstallationSection } from "./InstallationSection";
import { ElementsSection } from "./ElementsSection";
import { ManipulationSection } from "./ManipulationSection";
import { EventsSection } from "./EventsSection";
//import { HttpSection } from "./HttpSection";
import { StateSection } from "./StateSection";
import { UtilitiesSection } from "./UtilitiesSection";

export const DocumentationContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-bunny-black mb-8">
        Bunny - Maneja el DOM de manera sencilla
      </h1>
      <p className="text-gray-700 mb-8 text-lg">
      En el desarrollo web moderno, muchas veces nos encontramos en situaciones donde necesitamos manipular el DOM pero no queremos la sobrecarga de un framework completo. BunnyJS surge como respuesta a esta necesidad, ofreciendo una alternativa ligera pero potente a bibliotecas como jQuery, con un enfoque más moderno basado en clases y con soporte nativo para TypeScript.
      </p>

      <InstallationSection />
      <ElementsSection />
      <ManipulationSection />
      <EventsSection />
      {/*<HttpSection />*/}
      <StateSection/>
      <UtilitiesSection />
    </div>
  );
};
