
import { CodeBlock } from "../ui/CodeBlock";

const eventsCode = `// Click básico
const button = bunny.button("Haz clic");
button.when("click", (target) => {
  alert("¡Botón pulsado!");
});

// Usando event object
const input = bunny.input();
input.when("input", (target, event) => {
  console.log("Valor actual:", target.value);
  event.preventDefault();
});

// Múltiples eventos en un elemento
const campo = bunny.input();
campo.when("focus", (target) => {
  target.style.borderColor = "#FFC700";
});
campo.when("blur", (target) => {
  target.style.borderColor = "#ccc";
});

// Delegación de eventos en una lista
const list = bunny.ul();
list.li("Elemento 1");
list.li("Elemento 2");

list.when("click", (target, event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("seleccionado");
  }
});

// Remover eventos
button.removeEvent("click");`;

export const EventsSection = () => {
  return (
    <section id="eventos" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Eventos
      </h2>
      <p className="mb-4 text-gray-700">
        Maneja interacciones del usuario mediante el método <code className="bg-gray-100 px-1 py-0.5 rounded text-bunny-black">when</code> para asociar eventos a elementos.
      </p>
      <CodeBlock code={eventsCode} />
      <p className="mt-4 text-gray-700">
        bunny simplifica el manejo de eventos al proporcionar acceso directo al elemento objetivo y al objeto de evento nativo.
      </p>
    </section>
  );
};
