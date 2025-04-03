
import { CodeBlock } from "../ui/CodeBlock";

const utilitiesCode = `// Ejecución periódica
bunny.wait(1000, () => {
  console.log("Ha pasado un segundo");
});

// Ejecución retrasada
bunny.delay(2000, () => {
  console.log("Han pasado dos segundos");
});

// Esperar a que el DOM esté listo
bunny.ready(() => {
  // iniciar la aplicación
});`;

export const UtilitiesSection = () => {
  return (
    <section id="utilidades" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Utilidades
      </h2>
      <p className="mb-4 text-gray-700">
        bunny incluye varias funciones de utilidad para tareas comunes en desarrollo web.
      </p>
      <CodeBlock code={utilitiesCode} />
      <p className="mt-4 text-gray-700">
        Estas utilidades te ayudan a escribir código más limpio y eficiente en tus proyectos.
      </p>
    </section>
  );
};
