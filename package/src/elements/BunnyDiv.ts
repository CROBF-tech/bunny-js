import BunnyElement from "./BunnyElement";
/**
 * Clase especializada para divs
 */
export default class BunnyDiv extends BunnyElement<HTMLDivElement> {
  constructor() {
    super("div");
  }
}
