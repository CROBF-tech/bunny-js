
import { CodeBlock } from "../ui/CodeBlock";

const installationCode = `<!-- Usando CDN -->
<script src="https://cdn.bunnyjs.org/bunny.min.js"></script>

<!-- O instalando via npm -->
npm install bunny-js

// Y luego importándolo
import bunny from 'bunny-js';`;

export const InstallationSection = () => {
  return (
    <section id="instalacion" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Instalación
      </h2>
      <p className="mb-4 text-gray-700">
        Puedes incluir bunny en tu proyecto de varias maneras:
      </p>
      <CodeBlock code={installationCode} />
      <p className="mt-4 text-gray-700">
        Después de instalar, puedes usar el objeto <code className="bg-gray-100 px-1 py-0.5 rounded text-bunny-black">bunny</code> para acceder a todas las funcionalidades de la librería.
      </p>
    </section>
  );
};
