import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase especializada para celdas de datos de tabla
 */
export default class BunnyTableField extends BunnyElement<HTMLTableCellElement> {
  constructor() {
    super("td");
  }
}
