import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase especializada para divs
 */
export default class BunnyDiv extends BunnyElement<HTMLDivElement> {
  constructor() {
    super("div");
  }
}
