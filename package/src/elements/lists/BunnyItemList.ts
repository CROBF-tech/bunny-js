import BunnyElement from "@/core/BunnyContainer";
/**
 * Clase para representar elementos de lista (li)
 */
export default class BunnyItemList extends BunnyElement<HTMLLIElement> {
  constructor() {
    super("li");
  }
}
