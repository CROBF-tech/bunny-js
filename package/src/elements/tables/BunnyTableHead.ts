import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase especializada para celdas de encabezado de tabla
 */
export default class BunnyTableHead extends BunnyElement<HTMLTableCellElement> {
  constructor() {
    super("th");
  }
}
