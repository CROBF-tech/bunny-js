import BunnyElement from "./BunnyElement";
/**
 * Clase para representar elementos de lista (li)
 */
export default class BunnyItemList extends BunnyElement<HTMLLIElement> {
  constructor() {
    super("li");
  }
}
