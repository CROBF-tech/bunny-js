import BunnyElement from "./BunnyElement";
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
   * Añade un elemento de lista con el texto especificado
   * @param text Texto del elemento de lista
   * @returns La instancia actual para encadenamiento
   */
  li(text: string): this {
    const listItem = new BunnyItemList();
    listItem.text(text);
    this.append(listItem);
    return this;
  }

  /**
   * Añade un elemento de lista vacío y lo devuelve
   * @returns El elemento de lista creado
   */
  addItem(): BunnyItemList {
    const listItem = new BunnyItemList();
    this.append(listItem);
    return listItem;
  }
}
