
import { CodeBlock } from "../ui/CodeBlock";

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

export const HttpSection = () => {
  return (
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
  );
};
