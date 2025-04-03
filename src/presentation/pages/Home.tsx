
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "../components/ui/CodeBlock";
import { FeatureCard } from "../components/ui/FeatureCard";

const Home = () => {
  // Example code snippets
  const simpleExample = `// Crear y manipular elementos
const button = bunny.button("Click me");
button.when("click", (target) => {
  target.textContent = "¡Gracias por usar bunny!";
});

// Aplicar estilos
button.style("backgroundColor", "#FFC700");
button.insertIn(document.body);`;

  const ajaxExample = `// Realizar peticiones AJAX
bunny.fetch("https://api.example.com/data")
  .then(data => {
    const list = bunny.ul();
    
    data.items.forEach(item => {
      list.li(item.name);
    });
    
    list.insertIn(document.querySelector(".result"));
  });`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-bunny-yellow/70 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bunny-black mb-4">
                Interactúa con el DOM.
                <br />
                <span className="text-white">Simple. Rápido.</span>
              </h1>
              <p className="text-bunny-black/80 text-lg md:text-xl mb-8 max-w-lg">
                Una pequeña librería JavaScript minimalista para crear y manipular elementos del DOM de forma sencilla y directa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-bunny-black text-bunny-yellow hover:bg-bunny-black/90 text-lg px-8 py-6" 
                  asChild
                >
                  <Link to="/docs">Comenzar con Bunny</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-bunny-black text-bunny-black hover:bg-bunny-black/10 text-lg px-8 py-6"
                  asChild
                >
                  <a 
                    href="https://github.com/bunny/bunny-js" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver en GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="transform rotate-0 hover:rotate-2 hover:scale-[1.1] transition-transform max-w-[80vw]">
              <img src="/logo.png" alt="" className="max-w-[100%] mb-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-bunny-black text-center mb-16">
            <span className="border-b-4 border-bunny-yellow leading-10">
              ¿Por qué elegir bunny?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Minimalista"
              description="Solo lo esencial. Sin dependencias adicionales ni código innecesario que ralentice tu aplicación."
            />
            <FeatureCard
              title="Directo"
              description="Sintaxis clara y concisa. Evita encadenamientos innecesarios y se enfoca en un código limpio."
            />
            <FeatureCard
              title="Ligero"
              description="Menos de 5KB minificado y comprimido. Carga rápida y rendimiento optimizado."
            />
            <FeatureCard
              title="Moderno"
              description="Desarrollado con JavaScript moderno y buenas prácticas para proyectos actuales."
            />
            <FeatureCard
              title="Fácil de aprender"
              description="Documentación clara y ejemplos sencillos para empezar a usar bunny en minutos."
            />
            <FeatureCard
              title="Vanilla JS"
              description="Sin frameworks ni bibliotecas adicionales. Solo JavaScript puro para máxima compatibilidad."
            />
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 px-4 bg-bunny-yellow-lighter">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-bunny-black mb-6">
                Código simple y elegante
              </h2>
              <p className="text-bunny-black/80 text-lg mb-8">
                bunny está diseñado para ser intuitivo y fácil de usar. Crea elementos, manipula el DOM y maneja eventos con una sintaxis clara y directa.
              </p>
              <ul className="space-y-4 text-bunny-black/80">
                <li className="flex items-start">
                  <span className="text-bunny-yellow bg-bunny-black rounded-[100%] py-1 px-2 mr-3 inline-flex">✓</span>
                  <span>Creación de elementos simplificada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bunny-yellow bg-bunny-black rounded-[100%] py-1 px-2 mr-3 inline-flex">✓</span>
                  <span>Manipulación del DOM directa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bunny-yellow bg-bunny-black rounded-[100%] py-1 px-2 mr-3 inline-flex">✓</span>
                  <span>Manejo de eventos con eventos nativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bunny-yellow bg-bunny-black rounded-[100%] py-1 px-2 mr-3 inline-flex">✓</span>
                  <span>Solicitudes HTTP simplificadas</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-bunny-black/90 rounded-lg p-1 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform max-w-[80vw]">
                <CodeBlock
                  code={ajaxExample}
                  title="ajax-ejemplo.js"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-bunny-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-bunny-yellow mb-6">
            ¿Listo para simplificar tu código?
          </h2>
          <p className="text-bunny-yellow-light text-lg mb-10 max-w-2xl mx-auto">
            Comienza a utilizar bunny hoy mismo y descubre cómo puedes crear interacciones web de manera sencilla y eficiente.
          </p>
          <Button 
            className="bg-bunny-yellow text-bunny-black hover:bg-bunny-yellow/90 text-lg px-8 py-6 animate-bounce-subtle" 
            asChild
          >
            <Link to="/docs">Comenzar con Bunny</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
