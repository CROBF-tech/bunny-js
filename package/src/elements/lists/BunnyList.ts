import BunnyElement from "@/core/BunnyContainer";
import BunnyItemList from "./BunnyItemList";

/**
 * Clase base para listas (ul/ol)
 */
export default class BunnyList extends BunnyElement<
  HTMLUListElement | HTMLOListElement
> {
  constructor(type: "ul" | "ol" = "ul") {
    super(type);
  }

  /**
   * Añade un elemento de lista vacío y lo devuelve
   * @returns El elemento de lista creado
   */
  addItem(content: string): BunnyItemList {
    const listItem = new BunnyItemList();
    listItem.html(content);
    this.element.append(listItem.getElement());
    return listItem;
  }
}
