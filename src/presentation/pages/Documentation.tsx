
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "../components/ui/CodeBlock";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  title: string;
};

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

  // Code examples
  const installationCode = `<!-- Usando CDN -->
<script src="https://cdn.bunnyjs.org/bunny.min.js"></script>

<!-- O instalando via npm -->
npm install bunny-js

// Y luego importándolo
import bunny from 'bunny-js';`;

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

  const httpCode = `// GET request simple
bunny.fetch("https://api.ejemplo.com/datos")
  .then(data => {
    const list = bunny.ul();
    
    data.forEach(item => {
      list.li(item.nombre);
    });
    
    list.insertIn(document.querySelector(".resultados"));
  })
  .catch(error => {
    console.error("Error:", error);
  });

// POST request con datos
bunny.fetch("https://api.ejemplo.com/usuarios", {
  method: "POST",
  body: {
    nombre: "Usuario",
    email: "usuario@ejemplo.com"
  }
})
.then(response => {
  const mensaje = bunny.p("Usuario creado: " + response.id);
  mensaje.insertIn(document.querySelector(".mensaje"));
});

// Petición con opciones personalizadas
bunny.fetch("https://api.ejemplo.com/datos", {
  method: "GET",
  headers: {
    "Authorization": "Bearer token123"
  },
  timeout: 5000
})
.then(data => {
  console.log(data);
});`;

  const utilitiesCode = `// Iterar sobre elementos
const items = document.querySelectorAll("li");
bunny.each(items, (item, index) => {
  item.textContent = \`Elemento \${index + 1}\`;
});

// Comprobar si un elemento tiene una clase
const elemento = document.querySelector(".btn");
if (bunny.hasClass(elemento, "activo")) {
  // hacer algo
}

// Ejecución periódica
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
});

// Depuración
bunny.log("Mensaje de depuración", { data: "valor" });`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 lg:w-80 bg-white border-r border-gray-200 md:sticky md:top-[73px] md:self-start md:h-[calc(100vh-73px)] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-bunny-black mb-6">Documentación</h2>
          <nav>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-medium",
                      activeSection === section.id
                        ? "bg-bunny-yellow/20 text-bunny-black"
                        : "text-gray-700 hover:bg-bunny-yellow/10 hover:text-bunny-black"
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-bunny-black mb-8">
            Documentación de bunny
          </h1>
          <p className="text-gray-700 mb-12 text-lg">
            Bienvenido a la documentación oficial de bunny. Aquí encontrarás todo lo que necesitas para comenzar a utilizar esta librería JavaScript minimalista para interactuar con el DOM de manera sencilla.
          </p>

          {/* Installation Section */}
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

          {/* Elements Section */}
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

          {/* DOM Manipulation Section */}
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

          {/* Events Section */}
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

          {/* HTTP Section */}
          <section id="http" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
              HTTP
            </h2>
            <p className="mb-4 text-gray-700">
              Realiza peticiones HTTP asíncronas para cargar datos sin recargar la página.
            </p>
            <CodeBlock code={httpCode} />
            <p className="mt-4 text-gray-700">
              Las funciones HTTP de bunny facilitan la comunicación con APIs y servicios web de manera directa.
            </p>
          </section>

          {/* Utilities Section */}
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
        </div>
      </main>
    </div>
  );
};

export default Documentation;
