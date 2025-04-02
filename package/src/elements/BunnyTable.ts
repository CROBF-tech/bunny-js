import BunnyElement from "./BunnyElement";
import BunnyRow from "./BunnyRow";

/**
 * Clase especializada para elementos de tabla
 */
export default class BunnyTable extends BunnyElement<HTMLTableElement> {
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
