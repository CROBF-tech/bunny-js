import { CodeBlock } from "../ui/CodeBlock";

const stateCreationCode = `// Crear un estado
const contador = bunny.createState('contador', 0);

// Obtener y establecer valores
console.log(contador.get()); // 0
contador.set(5);
console.log(contador.get()); // 5

// Actualizar basado en el valor actual
contador.update(current => current + 1);
console.log(contador.get()); // 6

// Suscribirse a cambios
const cancelarSuscripcion = contador.subscribe((nuevoValor, valorAnterior) => {
  console.log(\`Contador cambió de \${valorAnterior} a \${nuevoValor}\`);
});

// Más tarde, cancelar la suscripción
cancelarSuscripcion();`;

const stateBindingCode = `// Crear un estado para nombre de usuario
const nombreUsuario = bunny.createState('usuario', '');

// Vincular a un input
const inputNombre = bunny.select('#input-nombre');
nombreUsuario.bind(inputNombre, (container, valor) => {
  container.attr('value', valor);
});

// Vincular el estado a elementos de visualización
const etiquetaNombre = bunny.select('.nombre-usuario');
nombreUsuario.bind(etiquetaNombre, (container, valor) => {
  container.text(valor ? \`Usuario: \${valor}\` : 'Sin nombre');
});

// Actualizar el input manualmente (actualiza también la etiqueta)
nombreUsuario.set('Ana');

// Vincular cambios del input al estado
inputNombre.when('input', (target) => {
  nombreUsuario.set(target.element.value);
});`;

const stateMultipleCode = `// Crear múltiples estados para una aplicación
const estadoApp = {
  tema: bunny.createState('tema', 'claro'),
  contador: bunny.createState('contador', 0),
  usuario: bunny.createState('usuario', null)
};

// Vincular el tema a la clase del body
estadoApp.tema.bind('body', (container, tema) => {
  container.removeClass('tema-claro tema-oscuro')
    .addClass(\`tema-\${tema}\`);
});

// Comprobar si un estado existe
if (bunny.hasState('tema')) {
  console.log('El estado de tema ya existe');
}

// Eliminar un estado cuando ya no se necesita
bunny.removeState('estadoTemporal');

// Obtener todas las claves de estados disponibles
const estados = bunny.getAllStateKeys();
console.log(estados); // ['tema', 'contador', 'usuario']`;

export const StateSection = () => {
  return (
    <section id="estados" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-bunny-black mb-4 pb-2 border-b border-gray-200">
        Estados
      </h2>
      <p className="mb-4 text-gray-700">
        Bunny incluye un sistema de gestión de estado que permite crear interfaces reactivas de manera sencilla, sin necesidad de frameworks pesados.
      </p>
      
      <h3 className="text-xl font-semibold text-bunny-black mt-6 mb-3">
        Creación y manipulación de estados
      </h3>
      <p className="mb-4 text-gray-700">
        Crea estados con valores iniciales y manipúlalos mediante métodos intuitivos.
      </p>
      <CodeBlock code={stateCreationCode} />
      
      <h3 className="text-xl font-semibold text-bunny-black mt-6 mb-3">
        Vinculación con elementos del DOM
      </h3>
      <p className="mb-4 text-gray-700">
        Conecta estados a elementos del DOM para actualizar la interfaz automáticamente cuando el estado cambie.
      </p>
      <CodeBlock code={stateBindingCode} />
      
      <h3 className="text-xl font-semibold text-bunny-black mt-6 mb-3">
        Gestión avanzada de estados
      </h3>
      <p className="mb-4 text-gray-700">
        Trabaja con múltiples estados y utiliza funciones auxiliares para organizarlos.
      </p>
      <CodeBlock code={stateMultipleCode} />
      
      <p className="mt-4 text-gray-700">
        El sistema de estados de Bunny ofrece una solución ligera pero potente para crear interfaces reactivas, manteniendo la filosofía de simplicidad y eficiencia de la librería.
      </p>
    </section>
  );
};