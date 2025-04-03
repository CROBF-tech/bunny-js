# BunnyJS - Manipulación del DOM simple y eficiente

BunnyJS es una librería minimalista para JavaScript que facilita la manipulación del DOM sin depender de frameworks pesados. Con una API fluida e intuitiva, BunnyJS te permite crear, modificar y gestionar elementos HTML de manera elegante y eficiente.

## Introducción

En el desarrollo web moderno, muchas veces nos encontramos en situaciones donde necesitamos manipular el DOM pero no queremos la sobrecarga de un framework completo. BunnyJS surge como respuesta a esta necesidad, ofreciendo una alternativa ligera pero potente a bibliotecas como jQuery, con un enfoque más moderno basado en clases y con soporte nativo para TypeScript.

### ¿Por qué BunnyJS?

- **Minimalista pero completa**: Contiene solo lo necesario para manipular el DOM eficientemente
- **API fluida**: Permite encadenar métodos para una sintaxis limpia y expresiva
- **Orientada a objetos**: Utiliza clases y herencia para una estructura clara y extensible
- **TypeScript nativo**: Diseñada con tipos desde el principio para un mejor autocompletado y detección de errores
- **Independiente**: No requiere de otras bibliotecas o frameworks
- **Moderna**: Aprovecha las APIs más recientes del navegador

## Instalación

### Mediante npm

```bash
npm i @crobf/bunny-js
```

### Mediante unpkg

```html
<script src="https://unpkg.com/@crobf/bunny-js@latest/dist/bunny.umd.js"></script>
```

## Uso Básico

BunnyJS se centra en la creación y manipulación de elementos del DOM a través de una interfaz fluida. Aquí hay algunos ejemplos básicos para empezar:

### Crear y añadir elementos

```javascript
// Importar BunnyJS
import bunny from "@crobf/bunny-js";

// Crear un div con texto
const miDiv = bunny.div().text("Hola Mundo");

// Añadir el div al cuerpo del documento
miDiv.insertIn(document.body);
```

### Crear elementos con atributos y eventos

```javascript
// Crear un botón con texto, ID y manejador de eventos
const miBoton = bunny
  .button("Haz clic")
  .id("miBoton")
  .addClass("boton-primario")
  .when("click", (target, event) => {
    console.log("Botón clickeado");
  });

// Insertar en un elemento con ID 'app'
miBoton.insertIn("#app");
```

### Crear una estructura más compleja

```javascript
const formulario = bunny.div().addClass("formulario").id("formularioContacto");

// Añadir título
formulario.title("Formulario de Contacto", 2);

// Añadir campos
const campoNombre = formulario
  .div()
  .addClass("campo");
campoNombre.p("Nombre:");
campoNombre.input("text")
  .attr({ placeholder: "Escribe tu nombre" });

const campoEmail = formulario
  .div()
  .addClass("campo");
campoEmail.p("Email:");
campoEmail.input("email")
  .attr({ placeholder: "Escribe tu email" });

// Añadir botón
formulario
  .button("Enviar")
  .addClass("boton-enviar")
  .when("click", (target, event) => {
    // Lógica de envío
  });

// Insertar en el DOM
formulario.insertIn("#app");
```

## Guía de API

### Objeto Principal: `bunny`

El objeto `bunny` es el punto de entrada principal para trabajar con la librería. Proporciona métodos para crear diferentes tipos de elementos HTML y para manipular el DOM.

#### Métodos de selección

##### `bunny.select(selector)`

Selecciona un elemento del DOM mediante un selector CSS.

- **Parámetros**: `selector` (string) - Selector CSS para encontrar el elemento
- **Retorna**: `BunnyContainer` con el elemento seleccionado o `null` si no se encuentra
- **Ejemplo**:
  ```javascript
  const miElemento = bunny.select("#miId");
  if (miElemento) {
    miElemento.text("Nuevo texto");
  }
  ```

##### `bunny.selectAll(selector)`

Selecciona múltiples elementos del DOM mediante un selector CSS.

- **Parámetros**: `selector` (string) - Selector CSS para encontrar los elementos
- **Retorna**: Array de `BunnyContainer` con los elementos seleccionados
- **Ejemplo**:
  ```javascript
  const parrafos = bunny.selectAll("p");
  parrafos.forEach((p) => p.addClass("destacado"));
  ```

#### Método `ready`

##### `bunny.ready(callback)`

Ejecuta una función cuando el DOM esté completamente cargado.

- **Parámetros**: `callback` (función) - Función a ejecutar
- **Ejemplo**:
  ```javascript
  bunny.ready(() => {
    console.log("DOM cargado completamente");
    // Inicializar aplicación
  });
  ```

#### Métodos de creación de elementos

BunnyJS proporciona métodos para crear diferentes tipos de elementos HTML. Todos estos métodos retornan un objeto `BunnyContainer` que permite manipular el elemento creado.

##### Elementos básicos

- `bunny.div()` - Crea un elemento `<div>`
- `bunny.p(texto)` - Crea un elemento `<p>` con texto opcional
- `bunny.input(tipo)` - Crea un elemento `<input>` con tipo opcional (por defecto "text")
- `bunny.button(texto)` - Crea un elemento `<button>` con texto opcional

##### Elementos de tabla

- `bunny.table()` - Crea un elemento `<table>`
- `bunny.row()` - Crea un elemento `<tr>`
- `bunny.th(texto)` - Crea un elemento `<th>` con texto opcional
- `bunny.td(texto)` - Crea un elemento `<td>` con texto opcional

##### Elementos de lista

- `bunny.ul()` - Crea un elemento `<ul>`
- `bunny.ol()` - Crea un elemento `<ol>`
- `bunny.li(texto)` - Crea un elemento `<li>` con texto opcional

##### Títulos

- `bunny.title(texto, nivel)` - Crea un elemento de título (`<h1>` a `<h6>`) con el texto y nivel especificados

##### Elemento genérico

- `bunny.element(tagName)` - Crea un elemento con la etiqueta HTML especificada

**Ejemplo**:

```javascript
// Crear varios tipos de elementos
const miDiv = bunny.div();
const miParrafo = bunny.p("Este es un párrafo");
const miBoton = bunny.button("Haz clic");
const miInput = bunny.input("email");
const miTitulo = bunny.title("Título principal", 1);
const miElemento = bunny.element("section");
```

### Clase: `BunnyContainer`

La clase `BunnyContainer` envuelve elementos HTML y proporciona métodos para manipularlos. Todos los métodos de creación de elementos en `bunny` devuelven instancias de `BunnyContainer`.

#### Métodos de manipulación

##### `id(id)`

Establece el atributo ID del elemento.

- **Parámetros**: `id` (string) - Valor del atributo ID
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  bunny.div().id("miContenedor");
  ```

##### `class(classes)` / `addClass(classes)`

Añade clases CSS al elemento.

- **Parámetros**: `classes` (string) - Clases a añadir, separadas por espacio
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  bunny.div().class("contenedor principal");
  // o
  bunny.div().addClass("contenedor principal");
  ```

##### `removeClass(classes)`

Elimina clases CSS del elemento.

- **Parámetros**: `classes` (string) - Clases a eliminar, separadas por espacio
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  miElemento.removeClass("destacado");
  ```

##### `style(styles)`

Aplica estilos CSS al elemento.

- **Parámetros**: `styles` (objeto) - Estilos CSS a aplicar
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  bunny.div().style({
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  });
  ```

##### `attr(attrs)`

Establece múltiples atributos en el elemento.

- **Parámetros**: `attrs` (objeto) - Atributos a establecer
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  bunny.input().attr({
    type: "email",
    placeholder: "Tu correo electrónico",
    required: "true",
  });
  ```

##### `text(texto)`

Establece o devuelve el contenido de texto del elemento.

- **Parámetros**: `texto` (string, opcional) - Texto a establecer
- **Retorna**: `this` para encadenamiento o el texto actual si no se proporcionan parámetros
- **Ejemplo**:

  ```javascript
  // Establecer texto
  miElemento.text("Nuevo texto");

  // Obtener texto
  const textoActual = miElemento.text();
  ```

##### `html(contenido)`

Establece o devuelve el contenido HTML del elemento.

- **Parámetros**: `contenido` (string, opcional) - HTML a establecer
- **Retorna**: `this` para encadenamiento o el HTML actual si no se proporcionan parámetros
- **Ejemplo**:

  ```javascript
  // Establecer HTML
  miElemento.html("<strong>Texto en negrita</strong>");

  // Obtener HTML
  const htmlActual = miElemento.html();
  ```

##### `when(evento, manejador)`

Añade un manejador de eventos al elemento.

- **Parámetros**:
  - `evento` (string) - Tipo de evento (click, input, etc.)
  - `manejador` (función) - Función a ejecutar cuando ocurra el evento
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  bunny.button("Guardar").when("click", (target, event) => {
    console.log("Botón guardado clickeado");
    alert("¡Datos guardados!");
  });
  ```

##### `parent()`

Obtiene el contenedor padre del elemento actual.

- **Retorna**: `BunnyContainer` con el elemento padre o `null` si no existe
- **Ejemplo**:
  ```javascript
  const padre = miElemento.parent();
  if (padre) {
    padre.addClass("contenedor-activo");
  }
  ```

##### `insertIn(container)`

Inserta el elemento en el contenedor especificado.

- **Parámetros**: `container` (string | HTMLElement) - Selector CSS o elemento DOM
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  miElemento.insertIn("#app");
  // o
  miElemento.insertIn(document.getElementById("app"));
  ```

##### `remove()`

Elimina el elemento del DOM.

- **Ejemplo**:
  ```javascript
  miElemento.remove();
  ```

##### `map(callback)`

Aplica una función a cada elemento hijo.

- **Parámetros**: `callback` (función) - Función a aplicar a cada hijo
- **Retorna**: `this` para encadenamiento
- **Ejemplo**:
  ```javascript
  const lista = bunny.ul();
  // Añadir elementos a la lista...
  lista.map((item) => {
    item.addClass("item-lista");
  });
  ```

#### Obtención de elementos nativos

##### `getElement()`

Devuelve el elemento HTML nativo.

- **Retorna**: Elemento HTML nativo
- **Ejemplo**:
  ```javascript
  const elementoNativo = miElemento.getElement();
  // Ahora puedes usar APIs nativas del DOM
  elementoNativo.scrollIntoView();
  ```

##### `getContext()`

Devuelve el elemento BunnyElement interno.

- **Retorna**: Instancia de BunnyElement
- **Ejemplo**:
  ```javascript
  const contexto = miElemento.getContext();
  ```

## Ejemplos Avanzados

### Crear una tabla de datos

```javascript
function crearTabla(datos) {
  const tabla = bunny.table().addClass("tabla-datos");

  // Crear encabezado
  const encabezado = tabla.row();
  Object.keys(datos[0]).forEach((clave) => {
    encabezado.addHeader(clave);
  });

  // Crear filas de datos
  datos.forEach((fila) => {
    const filaDatos = tabla.row();
    Object.values(fila).forEach((valor) => {
      filaDatos.addCell(String(valor));
    });
  });

  return tabla;
}

// Uso
const datos = [
  { id: 1, nombre: "Juan", edad: 30 },
  { id: 2, nombre: "Ana", edad: 25 },
  { id: 3, nombre: "Carlos", edad: 28 },
];

const miTabla = crearTabla(datos);
miTabla.insertIn("#app");
```

### Crear un formulario dinámico

```javascript
function crearFormulario(campos, onSubmit) {

  const form = bunny
    .element("form")
    .addClass("formulario-dinamico")
    .when("submit", (_target, event) => {
      event.preventDefault();

      // Recopilar datos
      const datos = {};
      campos.forEach((campo) => {
        const input = bunny.select(`#${campo.id}`);
        if (input) {
          datos[campo.id] = input.getElement().value;
        }
      });

      // Llamar al callback
      onSubmit(datos);
    });

  // Crear campos
  campos.forEach((campo) => {
    const contenedor = form.div().addClass("campo-formulario");

    // Etiqueta
    contenedor.p(campo.etiqueta);

    // Input
    contenedor
      .input(campo.tipo || "text")
      .id(campo.id)
      .attr(campo.atributos || {});
  });

  // Botón de envío
  form.button("Enviar").attr({ type: "submit" }).addClass("boton-submit");

  return form;
}

// Uso
const formulario = crearFormulario(
  [
    { id: "nombre", etiqueta: "Nombre:", atributos: { required: "true" } },
    { id: "email", etiqueta: "Email:", tipo: "email" },
    { id: "mensaje", etiqueta: "Mensaje:", tipo: "textarea" },
  ],
  (datos) => {
    console.log("Datos enviados:", datos);
  }
);

formulario.insertIn("#app");
```

### Implementar una galería de imágenes simple

```javascript
function crearGaleria(imagenes) {
  const galeria = bunny.div().addClass("galeria-imagenes");

  // Contenedor principal
  galeria.style({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "10px",
  });

  // Añadir imágenes
  imagenes.forEach((img) => {
    const contenedor = galeria.div().addClass("item-galeria").style({
      overflow: "hidden",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    });

    // Crear elemento imagen
    const imagen = contenedor
      .element("img")
      .attr({
        src: img.url,
        alt: img.titulo || "Imagen de galería",
      })
      .style({
        width: "100%",
        height: "auto",
        display: "block",
        transition: "transform 0.3s ease",
      });

    // Añadir efecto hover
    contenedor
      .when("mouseenter", (target) => {
        target.style({ transform: "scale(1.05)" });
      })
      .when("mouseleave", (target) => {
        target.style({ transform: "scale(1)" });
      });

    // Añadir título si existe
    if (img.titulo) {
      contenedor.p(img.titulo).style({
        margin: "8px",
        textAlign: "center",
      });
    }
  });

  return galeria;
}

// Uso
const imagenes = [
  { url: "img/foto1.jpg", titulo: "Paisaje" },
  { url: "img/foto2.jpg", titulo: "Retrato" },
  { url: "img/foto3.jpg", titulo: "Naturaleza" },
];

const miGaleria = crearGaleria(imagenes);
miGaleria.insertIn("#app");
```

## Preguntas Frecuentes

### ¿Por qué usar BunnyJS en lugar de vanilla JavaScript?

Aunque las APIs modernas del DOM son muy potentes, BunnyJS ofrece una sintaxis más concisa y expresiva gracias a su API fluida. Esto reduce la cantidad de código necesario y mejora la legibilidad, especialmente en aplicaciones con mucha manipulación del DOM.

### ¿BunnyJS es compatible con frameworks como React o Vue?

BunnyJS está diseñado para ser independiente, pero puede usarse junto con frameworks para manipular partes específicas del DOM que estén fuera del control del framework. Sin embargo, para aplicaciones complejas se recomienda elegir entre usar BunnyJS como solución completa o adoptar un framework integral.

### ¿Cómo extender BunnyJS con componentes personalizados?

Puedes extender BunnyJS creando tus propias clases que hereden de `BunnyElement` para comportamientos específicos. También puedes crear funciones de utilidad que generen estructuras complejas pero reutilizables, como se muestra en los ejemplos avanzados.

### ¿BunnyJS funciona en todos los navegadores?

BunnyJS utiliza APIs modernas del DOM, por lo que es compatible con todos los navegadores actuales. Sin embargo, para navegadores muy antiguos podría requerirse un polyfill para algunas funcionalidades.

### ¿Cómo optimizar el rendimiento al trabajar con listas grandes?

Para listas muy grandes, es recomendable utilizar fragmentos de documento (`DocumentFragment`) para reducir el número de reflow del DOM. BunnyJS ya utiliza esta técnica internamente en su implementación, pero para manipulaciones complejas, considera crear la estructura completa antes de insertarla en el DOM.

## Contribuir

¿Encontraste un bug o tienes una idea para mejorar BunnyJS? ¡Nos encantaría tu contribución!

### Reportar problemas

1. Visita el repositorio en GitHub
2. Crea un nuevo issue detallando el problema
3. Incluye pasos para reproducirlo y el comportamiento esperado

### Proponer mejoras

1. Haz fork del repositorio
2. Crea una nueva rama con tu mejora
3. Envía un pull request con una descripción clara de los cambios

### Directrices de contribución

- Mantén el código simple y minimalista
- Asegúrate de incluir tipos para TypeScript
- Documenta los cambios en el código

---

¡Gracias por usar BunnyJS! Esperamos que esta librería te ayude a crear interfaces web de manera más sencilla y eficiente. Si tienes preguntas adicionales o necesitas ayuda, no dudes en crear un issue en nuestro repositorio.
