import BunnyElement from "./BunnyElement";
/**
 * Clase especializada para párrafos
 */
export default class BunnyParagraph extends BunnyElement<HTMLParagraphElement> {
  constructor() {
    super("p");
  }
}
