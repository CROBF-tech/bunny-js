import BunnyElement from "./elements/BunnyElement";
import BunnyDiv from "./elements/BunnyDiv";
import BunnyParagraph from "./elements/BunnyParagraph";
import BunnyInput from "./elements/BunnyInput";
import BunnyButton from "./elements/BunnyButton";
import BunnyTable from "./elements/BunnyTable";
import BunnyRow from "./elements/BunnyRow";
import BunnyTableHead from "./elements/BunnyTableHead";
import BunnyTableField from "./elements/BunnyTableField";
import BunnyItemList from "./elements/BunnyItemList";
import BunnyList from "./elements/BunnyList";
import BunnyHeading from "./elements/BunnyHeading";

/**
 * BunnyContainer funciona como un contexto para crear y manipular
 * elementos DOM de forma jerárquica.
 */
export class BunnyContainer<T extends HTMLElement = HTMLDivElement> {
  // El elemento actual que sirve como contexto
  protected contextElement: BunnyElement<T>;

  // Almacena los hijos directos para poder iterar sobre ellos
  protected children: BunnyElement<HTMLElement>[] = [];

  /**
   * Crea un nuevo contexto basado en un elemento existente o crea uno nuevo
   * @param elementOrTagName Un elemento BunnyElement existente o el nombre de una etiqueta
   */
  constructor(elementOrTagName: BunnyElement<T> | string = "div") {
    if (typeof elementOrTagName === "string") {
      // Si se proporciona un nombre de etiqueta, crear un nuevo elemento
      this.contextElement = new BunnyElement<T>(elementOrTagName);
    } else {
      // Si se proporciona un elemento existente, usarlo como contexto
      this.contextElement = elementOrTagName;
    }
  }

  /**
   * Selecciona un elemento del DOM y lo convierte en un BunnyContainer
   * @param selector Selector CSS para encontrar el elemento
   * @returns Un nuevo BunnyContainer con el elemento encontrado como contexto, o null si no se encuentra
   */
  static select(selector: string): BunnyContainer<HTMLElement> | null {
    const element = document.querySelector(selector);
    if (!element) {
      return null;
    }

    // Creamos un BunnyElement con la etiqueta correspondiente
    const bunnyElement = new BunnyElement<HTMLElement>(
      element.tagName.toLowerCase()
    );

    // Reemplazamos su elemento interno con el elemento DOM encontrado
    Object.defineProperty(bunnyElement, "element", {
      value: element,
      writable: false,
    });

    return new BunnyContainer<HTMLElement>(bunnyElement);
  }

  /**
   * Obtiene el elemento BunnyElement que sirve como contexto actual
   */
  getContext(): BunnyElement<T> {
    return this.contextElement;
  }

  /**
   * Obtiene el elemento HTML nativo del contexto actual
   */
  getElement(): T {
    return this.contextElement.getElement();
  }

  /**
   * Método interno para crear un elemento y cambiar el contexto
   * @param factory Función que crea el elemento
   * @returns Un nuevo contenedor con el elemento creado como contexto
   */
  private createWithContext<E extends HTMLElement>(
    factory: () => BunnyElement<E>
  ): BunnyContainer<E> {
    const element = factory();

    // Utilizar DocumentFragment para optimizar el rendimiento
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element.getElement());

    this.contextElement.getElement().appendChild(fragment);

    // Guardamos el elemento hijo para poder iterarlo después
    this.children.push(element as unknown as BunnyElement<HTMLElement>);

    return new BunnyContainer<E>(element);
  }

  // Métodos para crear elementos específicos dentro del contexto actual

  div(): BunnyContainer<HTMLDivElement> {
    return this.createWithContext(() => new BunnyDiv());
  }

  p(text?: string): BunnyContainer<HTMLParagraphElement> {
    const container = this.createWithContext(() => new BunnyParagraph());
    if (text !== undefined) {
      container.text(text);
    }
    return container;
  }

  input(type: string = "text"): BunnyContainer<HTMLInputElement> {
    return this.createWithContext(() => new BunnyInput(type));
  }

  button(text?: string): BunnyContainer<HTMLButtonElement> {
    const container = this.createWithContext(() => new BunnyButton());
    if (text !== undefined) {
      container.text(text);
    }
    return container;
  }

  table(): BunnyContainer<HTMLTableElement> {
    return this.createWithContext(() => new BunnyTable());
  }

  row(): BunnyContainer<HTMLTableRowElement> {
    return this.createWithContext(() => new BunnyRow());
  }

  th(text?: string): BunnyContainer<HTMLTableCellElement> {
    const container = this.createWithContext(() => new BunnyTableHead());
    if (text !== undefined) {
      container.text(text);
    }
    return container;
  }

  td(text?: string): BunnyContainer<HTMLTableCellElement> {
    const container = this.createWithContext(() => new BunnyTableField());
    if (text !== undefined) {
      container.text(text);
    }
    return container;
  }

  ol(): BunnyContainer<HTMLOListElement> {
    return this.createWithContext(
      () => new BunnyList("ol")
    ) as BunnyContainer<HTMLOListElement>;
  }

  ul(): BunnyContainer<HTMLUListElement> {
    return this.createWithContext(
      () => new BunnyList("ul")
    ) as BunnyContainer<HTMLUListElement>;
  }

  li(text?: string): BunnyContainer<HTMLLIElement> {
    const container = this.createWithContext(() => new BunnyItemList());
    if (text !== undefined) {
      container.text(text);
    }
    return container;
  }

  title(
    title: string,
    level: 1 | 2 | 3 | 4 | 5 | 6 = 1
  ): BunnyContainer<HTMLHeadingElement> {
    return this.createWithContext(() => new BunnyHeading(level, title));
  }

  /**
   * Aplica una función a todos los hijos directos del elemento
   * @param callback Función a aplicar a cada hijo
   * @returns El contenedor actual para encadenamiento
   */
  map(callback: (child: BunnyContainer<HTMLElement>) => void): this {
    this.children.forEach((child) => {
      const childContainer = new BunnyContainer(child);
      callback(childContainer);
    });
    return this;
  }

  // Métodos de acceso directo para atributos comunes

  /**
   * Establece el ID del elemento
   * @param id ID a establecer
   * @returns El contenedor actual para encadenamiento
   */
  id(id: string): this {
    this.contextElement.attr({ id });
    return this;
  }

  /**
   * Establece las clases CSS del elemento
   * @param classes Clases a establecer (separadas por espacios)
   * @returns El contenedor actual para encadenamiento
   */
  class(classes: string): this {
    return this.addClass(classes);
  }

  // Delegación de métodos de BunnyElement al contexto actual

  style(styles: Partial<CSSStyleDeclaration>): this {
    this.contextElement.style(styles);
    return this;
  }

  attr(attrs: Record<string, string>): this {
    this.contextElement.attr(attrs);
    return this;
  }

  text(text?: string): this | string {
    if (text === undefined) {
      return this.contextElement.text() as string;
    }
    this.contextElement.text(text);
    return this;
  }

  html(html?: string): this | string {
    if (html === undefined) {
      return this.contextElement.html() as string;
    }
    this.contextElement.html(html);
    return this;
  }

  when<K extends keyof HTMLElementEventMap>(
    eventTarget: K,
    handler: (target: BunnyElement<T>, event: HTMLElementEventMap[K]) => void
  ): this {
    this.contextElement.when(eventTarget, handler);
    return this;
  }

  addClass(classes: string): this {
    this.contextElement.addClass(classes);
    return this;
  }

  removeClass(classes: string): this {
    this.contextElement.removeClass(classes);
    return this;
  }

  // Nuevo método para cambiar a un contexto padre
  parent(): BunnyContainer<HTMLElement> | null {
    const element = this.contextElement.getElement();
    const parentElement = element.parentElement;

    if (!parentElement) {
      return null;
    }

    // Creamos un nuevo BunnyElement para el elemento padre
    const parentBunny = new BunnyElement<HTMLElement>("div");
    // Reemplazamos su elemento interno con el elemento padre real
    Object.defineProperty(parentBunny, "element", {
      value: parentElement,
      writable: false,
    });

    return new BunnyContainer<HTMLElement>(parentBunny);
  }

  // Método para insertar el contexto actual en el DOM
  insertIn(container: HTMLElement | string): this {
    this.contextElement.insertIn(container);
    return this;
  }

  // Método para eliminar el contexto actual del DOM
  remove(): void {
    this.contextElement.remove();
  }

  // Método para crear un nuevo elemento con la etiqueta especificada
  element<E extends HTMLElement>(tagName: string): BunnyContainer<E> {
    return this.createWithContext(() => new BunnyElement<E>(tagName));
  }
}
