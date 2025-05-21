import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase para encabezados (h1-h6)
 */
export default class BunnyHeading extends BunnyElement<HTMLHeadingElement> {
  /**
   * Crea un nuevo encabezado
   * @param text Texto opcional del encabezado
   * @param level Nivel del encabezado (1-6)
   */
  constructor(text: string = "", level: 1 | 2 | 3 | 4 | 5 | 6 = 1) {
    super(`h${level}`);
    if (text) {
      this.text(text);
    }
  }
}
