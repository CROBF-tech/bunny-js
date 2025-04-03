import { CodeBlock } from "../ui/CodeBlock";

const manipulationCode = `// Crear un elemento y modificarlo
const title = bunny.title("Título original: Un <h2></h2>", 2);
title.text("Nuevo título");

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
card.style("background-color", "#f5f5f5");
card.style("padding", "20px");
card.style("border-radius", "8px");

// Clonar elementos
const original = bunny.p("Original");
const clon = original.clone();

// Insertar elementos de forma encadenada
const container = bunny.div()
  .append(original)
  .append(clon);

// O más directo
const button = container.button("Haz clic");

// Insertar al final del body
container.insertIn(document.body);`;

const utilsMethods = `// Puedes obtener un elemento ya creado
const miElemento = bunny.select('#miId');
if (miElemento) {
  // Y el resultado es un BunnyElement
  miElemento.text('Nuevo texto');
}

// Seleccionar múltiples elementos por clase
const elementos = bunny.selectAll('.miClase');
elementos.forEach(el => {
  el.text('Nuevo texto').addClass('modificado');
});

// Esperar a que el DOM esté listo
bunny.ready(() => {
  const app = bunny.div()
    .addClass('app-container')
    .p('La aplicación está lista')
    .insertIn(document.body);
});
`;

export const ManipulationSection = () => {
  return (
    <section id="manipulacion" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Manipulación del DOM
      </h2>
      <p className="mb-4 text-gray-700">
        Bunny ofrece una API fluida y poderosa para manipular el DOM de forma sencilla y eficiente. Puedes crear, modificar y gestionar elementos HTML con una sintaxis clara y encadenable.
      </p>
      <CodeBlock code={manipulationCode} />
      <p className="mb-4 text-gray-700">
        La biblioteca proporciona métodos de selección potentes para trabajar con elementos existentes y gestionar el ciclo de vida del DOM.
      </p>
      <CodeBlock code={utilsMethods} />
      <p className="mb-4 text-gray-700">
        Incluyendo helpers para crear cualquier elemento HTML de forma rápida y sencilla. Aquí tienes una lista completa de los métodos disponibles:
      </p>

       <CodeBlock code={`
// Elementos básicos
bunny.div() // Crea un <div>
bunny.p("Texto") // Crea un <p> con texto
bunny.input("text") // Crea un <input type="text">
bunny.button("Click me") // Crea un <button>

// Elementos de formulario
bunny.input("text")           // Crea un <input type="text">
bunny.button("Click me")      // Crea un <button>

// Elementos de tabla
bunny.table() // Crea una <table>
bunny.row() // Crea un <tr>
bunny.th("Encabezado") // Crea un <th>
bunny.td("Celda") // Crea un <td>

// Elementos de lista
bunny.ul() // Crea una <ul>
bunny.ol() // Crea una <ol>
bunny.li("Item") // Crea un <li>

// Títulos y texto
bunny.title("Mi título", 1) // Crea un <h1>
bunny.title("Subtítulo", 2) // Crea un <h2>
bunny.title("Sección", 3) // Crea un <h3>

// Elemento genérico
bunny.element("custom") // Crea cualquier elemento HTML personalizado
`} />
    </section>
  );
};
