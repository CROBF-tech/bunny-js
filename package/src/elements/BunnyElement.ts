/**
 * Tipo genérico para los manejadores de eventos
 */
export type EventHandler<T extends Event> = (event: T) => void;

/**
 * Clase base para todos los elementos de Bunny
 * Proporciona funcionalidad común para crear y manipular elementos HTML
 */
export default class BunnyElement<T extends HTMLElement> {
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
   * Establece el contenido de texto del elemento o retorna el actual
   * @param text Texto a establecer
   * @returns La instancia actual para encadenamiento o el contenido de texto actual
   */
  text(text?: string): this | string {
    if (!text) return this.element.textContent || "";
    this.element.textContent = text;
    return this;
  }

  /**
   * Establece el HTML interno del elemento o retorna el actual
   * @param html Contenido HTML a establecer
   * @returns El contenido HTML actual
   */
  html(html?: string): string {
    if (!html) return this.element.innerHTML;
    this.element.innerHTML = html;
    return this.element.innerHTML;
  }

  /**
   * Añade un manejador de eventos al elemento
   * @param eventTarget Tipo de evento a escuchar
   * @param handler Función manejadora del evento
   * @returns La instancia actual para encadenamiento
   */
  when<K extends keyof HTMLElementEventMap>(
    eventTarget: K,
    handler: (target: this, event: HTMLElementEventMap[K]) => void
  ): this {
    this.element.addEventListener(eventTarget, (event) => {
      handler(this, event); // Pasa `this` como primer parámetro y el evento como segundo
    });
    return this;
  }

  /**
   * Añade clases CSS al elemento
   * @param classes Clases a añadir, separadas por espacio
   * @returns La instancia actual para encadenamiento
   */
  addClass(classes: string): this {
    classes.split(" ").forEach((cls) => {
      if (this.element.classList.contains(cls.trim())) return;
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
      if (!this.element.classList.contains(cls.trim())) return;
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
