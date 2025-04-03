import BunnyElement from "./BunnyElement";
/**
 * Clase para encabezados (h1-h6)
 */
export default class BunnyHeading extends BunnyElement<HTMLHeadingElement> {
  /**
   * Crea un nuevo encabezado
   * @param level Nivel del encabezado (1-6)
   * @param text Texto opcional del encabezado
   */
  constructor(level: 1 | 2 | 3 | 4 | 5 | 6, text?: string) {
    super(`h${level}`);
    if (text) {
      this.text(text);
    }
  }
}
