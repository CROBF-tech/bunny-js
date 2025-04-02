
import { CodeBlock } from "../ui/CodeBlock";

const elementCode = `// Crear un botón
const button = bunny.button("Click me");

// Crear un párrafo
const paragraph = bunny.p("Este es un párrafo");

// Crear una lista
const list = bunny.ul();
list.li("Elemento 1");
list.li("Elemento 2");

// Crear una estructura anidada
const div = bunny.div();
const heading = div.h1("Título principal");
const subheading = div.h2("Subtítulo");

// Crear un enlace con atributos
const link = bunny.a("Ir a bunny");
link.attr("href", "https://bunnyjs.org");
link.attr("target", "_blank");

// Insertar elementos en el DOM
div.insertIn(document.body);`;

export const ElementsSection = () => {
  return (
    <section id="elementos" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Creación de elementos
      </h2>
      <p className="mb-4 text-gray-700">
        bunny proporciona métodos intuitivos para crear elementos HTML de forma programática.
      </p>
      <CodeBlock code={elementCode} />
      <p className="mt-4 text-gray-700">
        Los métodos de creación de elementos devuelven objetos que permiten seguir modificando o anidando elementos de manera directa.
      </p>
    </section>
  );
};
