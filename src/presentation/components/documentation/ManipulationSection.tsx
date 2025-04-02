
import { CodeBlock } from "../ui/CodeBlock";

const manipulationCode = `// Crear un elemento y modificarlo
const title = bunny.h2("Título original");
title.textContent = "Nuevo título";

// Modificar atributos
const image = bunny.img();
image.attr("src", "imagen.jpg");
image.attr("alt", "Descripción de la imagen");

// Añadir/quitar clases
const panel = bunny.div();
panel.addClass("destacado");
panel.removeClass("inactivo");

// Modificar estilos
const card = bunny.div();
card.style("backgroundColor", "#f5f5f5");
card.style("padding", "20px");
card.style("borderRadius", "8px");

// Clonar elementos
const original = bunny.p("Original");
const clon = original.clone();

// Insertar elementos
const container = bunny.div();
container.append(bunny.p("Nuevo contenido"));

// O más directo
container.p("Otro párrafo");
const button = container.button("Haz clic");

// Insertar al final del body
container.insertIn(document.body);`;

export const ManipulationSection = () => {
  return (
    <section id="manipulacion" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Manipulación del DOM
      </h2>
      <p className="mb-4 text-gray-700">
        bunny proporciona métodos sencillos para modificar el contenido, atributos y estilos de los elementos HTML.
      </p>
      <CodeBlock code={manipulationCode} />
      <p className="mt-4 text-gray-700">
        Todos los métodos de manipulación son directos y permiten modificar elementos de manera concisa.
      </p>
    </section>
  );
};
