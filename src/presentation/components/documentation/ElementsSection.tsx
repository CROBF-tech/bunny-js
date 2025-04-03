
import { CodeBlock } from "../ui/CodeBlock";

const addElementExample = `// Importar BunnyJS
import bunny from 'bunnyjs';

// Crear un div
const miDiv = bunny.div();

// Añadir texto al div
miDiv.text('Hola, soy un div');

// Añadir el div al cuerpo del documento
miDiv.insertIn(document.body);
`;

const addElementWithEvents = `// Crear un botón con texto, ID y clase
const miBoton = bunny.button('Haz clic');
miBoton.id('miBoton');
miBoton.addClass('boton-primario otra-clase');

// Añadir eventos al botón
miBoton.when('click', (target, event) => {
  console.log(\`Botón \${target} clickeado\`);
});

// Insertar en un elemento con ID 'app'
miBoton.insertIn('#app');
`;

const complexExample = `const formulario = bunny.form()
  .addClass('formulario')
  .id('formularioContacto');

// Añadir título
formulario.title('Formulario de Contacto', 2);

// Añadir campos
const campoNombre = formulario.div().addClass('campo');
campoNombre.p('Nombre:');
campoNombre.input('text').attr({ placeholder: 'Escribe tu nombre' });

const campoEmail = formulario.div().addClass('campo');
campoEmail.p('Email:');
campoEmail.input('email').attr({ placeholder: 'Escribe tu email' });

// Añadir botón
formulario.button('Enviar')
  .addClass('boton-enviar')
  .when('click', (target, event) => {
    // Lógica de envío
  });

// Insertar en el DOM
formulario.insertIn('#app');`;

export const ElementsSection = () => {
  return (
    <section id="elementos" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Creación de elementos
      </h2>
      <p className="mb-4 text-gray-700">
      BunnyJS se centra en la creación y manipulación de elementos del DOM a través de una interfaz fluida. Aquí hay algunos ejemplos básicos para empezar.
      </p>
      <h4 className="my-5">Crear y añadir elementos al DOM.</h4>
      <CodeBlock code={addElementExample} title="index.js" />
      <h4 className="my-5">Crear elementos con eventos y atributos.</h4>
      <CodeBlock code={addElementWithEvents} title="index.js"></CodeBlock>
      <h4 className="my-5">Crear estructuras complejas.</h4>
      <CodeBlock code={complexExample} title="index.js"></CodeBlock>
    </section>
  );
};
