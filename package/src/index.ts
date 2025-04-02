/**
 * Bunny - Una librería minimalista para manipulación del DOM en TypeScript
 */

/**
 * Tipo genérico para los manejadores de eventos
 */
type EventHandler<T extends Event> = (event: T) => void;

/**
 * Clase base para todos los elementos de Bunny
 * Proporciona funcionalidad común para crear y manipular elementos HTML
 */
class BunnyElement<T extends HTMLElement> {
  protected element: T;

  /**
   * Crea un nuevo elemento del tipo especificado
   * @param tagName Nombre de la etiqueta HTML a crear
   */
  constructor(tagName: string) {
    this.element = document.createElement(tagName) as T;
  }

  /**
   * Aplica estilos CSS al elemento
   * @param styles Objeto con los estilos a aplicar
   * @returns La instancia actual para encadenamiento
   */
  style(styles: Partial<CSSStyleDeclaration>): this {
    Object.assign(this.element.style, styles);
    return this;
  }

  /**
   * Establece atributos en el elemento
   * @param attrs Objeto con los atributos a establecer
   * @returns La instancia actual para encadenamiento
   */
  attr(attrs: Record<string, string>): this {
    Object.entries(attrs).forEach(([key, value]) => {
      this.element.setAttribute(key, value);
    });
    return this;
  }

  /**
   * Establece el contenido de texto del elemento
   * @param text Texto a establecer
   * @returns La instancia actual para encadenamiento
   */
  text(text: string): this {
    this.element.textContent = text;
    return this;
  }

  /**
   * Establece el HTML interno del elemento
   * @param html Contenido HTML a establecer
   * @returns La instancia actual para encadenamiento
   */
  html(html: string): this {
    this.element.innerHTML = html;
    return this;
  }

  /**
   * Añade un manejador de eventos al elemento
   * @param eventTarget Tipo de evento a escuchar
   * @param handler Función manejadora del evento
   * @returns La instancia actual para encadenamiento
   */
  when<K extends keyof HTMLElementEventMap>(
    eventTarget: K,
    handler: EventHandler<HTMLElementEventMap[K]>
  ): this {
    this.element.addEventListener(eventTarget, handler as EventListener);
    return this;
  }

  /**
   * Añade clases CSS al elemento
   * @param classes Clases a añadir, separadas por espacio
   * @returns La instancia actual para encadenamiento
   */
  addClass(classes: string): this {
    classes.split(" ").forEach((cls) => {
      if (cls.trim()) this.element.classList.add(cls.trim());
    });
    return this;
  }

  /**
   * Elimina clases CSS del elemento
   * @param classes Clases a eliminar, separadas por espacio
   * @returns La instancia actual para encadenamiento
   */
  removeClass(classes: string): this {
    classes.split(" ").forEach((cls) => {
      if (cls.trim()) this.element.classList.remove(cls.trim());
    });
    return this;
  }

  /**
   * Añade un elemento hijo
   * @param child Elemento a añadir como hijo
   * @returns La instancia actual para encadenamiento
   */
  append(child: BunnyElement<HTMLElement> | HTMLElement): this {
    const childElement =
      child instanceof BunnyElement ? child.getElement() : child;
    this.element.appendChild(childElement);
    return this;
  }

  /**
   * Inserta el elemento en el contenedor especificado
   * @param container Elemento contenedor o selector CSS
   * @returns La instancia actual para encadenamiento
   */
  insertIn(container: HTMLElement | string): this {
    const parent =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (parent) {
      parent.appendChild(this.element);
    } else {
      console.warn(
        "No se pudo encontrar el contenedor para insertar el elemento"
      );
    }

    return this;
  }

  /**
   * Elimina el elemento del DOM
   */
  remove(): void {
    this.element.remove();
  }

  /**
   * Devuelve el elemento HTML nativo
   * @returns El elemento HTML interno
   */
  getElement(): T {
    return this.element;
  }
}

/**
 * Clase especializada para elementos de tabla
 */
class BunnyTable extends BunnyElement<HTMLTableElement> {
  constructor() {
    super("table");
  }

  /**
   * Añade una fila a la tabla
   * @param row Fila a añadir
   * @returns La instancia actual para encadenamiento
   */
  addRow(row: BunnyRow): this {
    this.append(row);
    return this;
  }
}

/**
 * Clase especializada para filas de tabla
 */
class BunnyRow extends BunnyElement<HTMLTableRowElement> {
  constructor() {
    super("tr");
  }

  /**
   * Añade una celda de encabezado a la fila
   * @param content Contenido de la celda
   * @returns La instancia actual para encadenamiento
   */
  addHeader(content: string): this {
    const th = new BunnyTableHead().text(content);
    this.append(th);
    return this;
  }

  /**
   * Añade una celda de datos a la fila
   * @param content Contenido de la celda
   * @returns La instancia actual para encadenamiento
   */
  addCell(content: string): this {
    const td = new BunnyTableField().text(content);
    this.append(td);
    return this;
  }
}

/**
 * Clase especializada para celdas de encabezado de tabla
 */
class BunnyTableHead extends BunnyElement<HTMLTableHeaderCellElement> {
  constructor() {
    super("th");
  }
}

/**
 * Clase especializada para celdas de datos de tabla
 */
class BunnyTableField extends BunnyElement<HTMLTableDataCellElement> {
  constructor() {
    super("td");
  }
}

/**
 * Clase especializada para divs
 */
class BunnyDiv extends BunnyElement<HTMLDivElement> {
  constructor() {
    super("div");
  }
}

/**
 * Clase especializada para párrafos
 */
class BunnyParagraph extends BunnyElement<HTMLParagraphElement> {
  constructor() {
    super("p");
  }
}

/**
 * Clase especializada para inputs
 */
class BunnyInput extends BunnyElement<HTMLInputElement> {
  constructor(type: string = "text") {
    super("input");
    this.attr({ type });
  }

  /**
   * Establece el valor del input
   * @param value Valor a establecer
   * @returns La instancia actual para encadenamiento
   */
  value(value: string): this {
    this.element.value = value;
    return this;
  }

  /**
   * Obtiene el valor actual del input
   * @returns El valor actual
   */
  getValue(): string {
    return this.element.value;
  }
}

/**
 * Clase especializada para botones
 */
class BunnyButton extends BunnyElement<HTMLButtonElement> {
  constructor() {
    super("button");
  }
}

/**
 * Objeto global para crear instancias de elementos Bunny
 */
const bunny = {
  /**
   * Crea un elemento genérico
   * @param tagName Nombre de etiqueta HTML
   * @returns Nueva instancia de BunnyElement
   */
  element<T extends HTMLElement>(tagName: string): BunnyElement<T> {
    return new BunnyElement<T>(tagName);
  },

  /**
   * Crea un div
   * @returns Nueva instancia de BunnyDiv
   */
  div(): BunnyDiv {
    return new BunnyDiv();
  },

  /**
   * Crea un párrafo
   * @returns Nueva instancia de BunnyParagraph
   */
  p(): BunnyParagraph {
    return new BunnyParagraph();
  },

  /**
   * Crea un input
   * @param type Tipo de input
   * @returns Nueva instancia de BunnyInput
   */
  input(type: string = "text"): BunnyInput {
    return new BunnyInput(type);
  },

  /**
   * Crea un botón
   * @returns Nueva instancia de BunnyButton
   */
  button(): BunnyButton {
    return new BunnyButton();
  },

  /**
   * Crea una tabla
   * @returns Nueva instancia de BunnyTable
   */
  table(): BunnyTable {
    return new BunnyTable();
  },

  /**
   * Crea una fila de tabla
   * @returns Nueva instancia de BunnyRow
   */
  row(): BunnyRow {
    return new BunnyRow();
  },

  /**
   * Crea una celda de encabezado
   * @returns Nueva instancia de BunnyTableHead
   */
  th(): BunnyTableHead {
    return new BunnyTableHead();
  },

  /**
   * Crea una celda de datos
   * @returns Nueva instancia de BunnyTableField
   */
  td(): BunnyTableField {
    return new BunnyTableField();
  },
};

// Exportaciones para uso en módulos
export {
  BunnyElement,
  BunnyDiv,
  BunnyParagraph,
  BunnyInput,
  BunnyButton,
  BunnyTable,
  BunnyRow,
  BunnyTableHead,
  BunnyTableField,
  bunny,
};
