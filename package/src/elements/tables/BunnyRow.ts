import BunnyElement from "@/core/BunnyContainer";
import BunnyTableHead from "./BunnyTableHead";
import BunnyTableField from "./BunnyTableField";

/**
 * Clase especializada para filas de tabla
 */
export default class BunnyRow extends BunnyElement<HTMLTableRowElement> {
  constructor() {
    super("tr");
  }

  /**
   * Añade una celda de encabezado a la fila
   * @param content Contenido de la celda
   * @returns La instancia actual para encadenamiento
   */
  addHeader(content: string): this {
    const th = new BunnyTableHead();
    th.text(content);
    this.element.append(th.getElement());
    return this;
  }

  /**
   * Añade una celda de datos a la fila
   * @param content Contenido de la celda
   * @returns La instancia actual para encadenamiento
   */
  addCell(content: string): this {
    const td = new BunnyTableField();
    td.text(content);
    this.element.append(td.getElement());
    return this;
  }
}
