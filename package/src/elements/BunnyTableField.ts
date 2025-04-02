import BunnyElement from "./BunnyElement";
/**
 * Clase especializada para celdas de datos de tabla
 */
export default class BunnyTableField extends BunnyElement<HTMLTableDataCellElement> {
  constructor() {
    super("td");
  }
}
