import BunnyElement from "./BunnyElement";
/**
 * Clase especializada para inputs
 */
export default class BunnyInput extends BunnyElement<HTMLInputElement> {
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
