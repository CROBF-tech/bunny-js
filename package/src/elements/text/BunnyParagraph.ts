import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase especializada para párrafos
 */
export default class BunnyParagraph extends BunnyElement<HTMLParagraphElement> {
  constructor() {
    super("p");
  }
}
