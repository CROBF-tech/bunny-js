
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
    { id: "selectores", title: "Selectores" },
    { id: "manipulacion", title: "Manipulación DOM" },
    { id: "eventos", title: "Eventos" },
    { id: "ajax", title: "AJAX" },
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
import $ from 'bunny-js';`;

  const selectorCode = `// Seleccionar por ID
$("#miElemento");

// Seleccionar por clase
$(".mi-clase");

// Seleccionar por atributo
$("[data-role='button']");

// Combinando selectores
$("ul.menu li");

// Filtrando elementos
$("p").filter(".destacado");

// Encontrando elementos dentro de otro
$(".contenedor").find("a");`;

  const manipulationCode = `// Cambiar texto
$(".titulo").text("Nuevo título");

// Cambiar HTML
$(".contenido").html("<p>Nuevo párrafo</p>");

// Cambiar atributos
$("#miEnlace").attr("href", "https://ejemplo.com");

// Añadir/quitar clases
$(".boton")
  .addClass("destacado")
  .removeClass("inactivo");

// Modificar estilos
$(".panel").css({
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px"
});

// Clonar elementos
const clon = $(".original").clone();

// Insertar elementos
$(".contenedor").append("<p>Nuevo contenido</p>");
$("<button>Haz clic</button>").insertAfter(".referencia");`;

  const eventsCode = `// Click básico
$(".boton").on("click", function() {
  alert("¡Botón pulsado!");
});

// Con arrow function
$(".boton").on("click", () => {
  $(".mensaje").text("¡Hiciste clic!");
});

// Múltiples eventos
$(".campo")
  .on("focus", () => { /* código */ })
  .on("blur", () => { /* código */ });

// Delegación de eventos
$(".lista").on("click", "li", function() {
  // 'this' se refiere al elemento li que recibió el clic
  $(this).toggleClass("seleccionado");
});

// Remover eventos
$(".boton").off("click");`;

  const ajaxCode = `// GET request simple
$.ajax({
  url: "https://api.ejemplo.com/datos",
  success: (data) => {
    console.log(data);
    $(".resultados").html(
      data.map(item => \`<li>\${item.nombre}</li>\`).join("")
    );
  },
  error: (error) => {
    console.error("Error:", error);
  }
});

// POST request con datos
$.ajax({
  url: "https://api.ejemplo.com/usuarios",
  method: "POST",
  data: {
    nombre: "Usuario",
    email: "usuario@ejemplo.com"
  },
  success: (response) => {
    $(".mensaje").text("Usuario creado: " + response.id);
  }
});

// Atajos para GET y POST
$.get("https://api.ejemplo.com/datos", data => {
  $(".resultados").text(JSON.stringify(data));
});

$.post("https://api.ejemplo.com/enviar", 
  { mensaje: "Hola mundo" }, 
  response => {
    console.log(response);
  }
);`;

  const utilitiesCode = `// Iteración sobre elementos
$("li").each(function(index) {
  $(this).text(\`Elemento \${index + 1}\`);
});

// Comprobar si un elemento tiene una clase
if ($(".elemento").hasClass("activo")) {
  // hacer algo
}

// Comprobar si un elemento está visible
if ($(".elemento").isVisible()) {
  // hacer algo
}

// Animar elementos
$(".caja").animate({
  opacity: 0.5,
  left: "+=50",
  height: "toggle"
}, 500);

// Esperar a que el DOM esté listo
$(document).ready(() => {
  // iniciar la aplicación
});

// Forma corta
$(() => {
  // iniciar la aplicación
});`;

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
              Después de instalar, puedes usar el símbolo <code className="bg-gray-100 px-1 py-0.5 rounded text-bunny-black">$</code> para acceder a todas las funcionalidades de bunny.
            </p>
          </section>

          {/* Selectors Section */}
          <section id="selectores" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
              Selectores
            </h2>
            <p className="mb-4 text-gray-700">
              bunny utiliza selectores CSS para encontrar elementos HTML en tu página. Puedes utilizar cualquier selector válido de CSS.
            </p>
            <CodeBlock code={selectorCode} />
            <p className="mt-4 text-gray-700">
              Los métodos de selección devuelven una colección de elementos que puedes manipular con los métodos de bunny.
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
              Todos los métodos de manipulación pueden encadenarse para realizar múltiples operaciones en los mismos elementos.
            </p>
          </section>

          {/* Events Section */}
          <section id="eventos" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
              Eventos
            </h2>
            <p className="mb-4 text-gray-700">
              Maneja interacciones del usuario mediante eventos como clicks, hover, teclado y más.
            </p>
            <CodeBlock code={eventsCode} />
            <p className="mt-4 text-gray-700">
              bunny simplifica el manejo de eventos y proporciona una forma consistente de trabajar con ellos en diferentes navegadores.
            </p>
          </section>

          {/* AJAX Section */}
          <section id="ajax" className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
              AJAX
            </h2>
            <p className="mb-4 text-gray-700">
              Realiza peticiones HTTP asíncronas para cargar datos sin recargar la página.
            </p>
            <CodeBlock code={ajaxCode} />
            <p className="mt-4 text-gray-700">
              Las funciones AJAX de bunny facilitan la comunicación con APIs y servicios web de manera sencilla.
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
