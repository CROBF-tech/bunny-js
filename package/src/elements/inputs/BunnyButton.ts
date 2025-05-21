import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase especializada para botones
 */
export default class BunnyButton extends BunnyElement<HTMLButtonElement> {
  constructor() {
    super("button");
  }
}
