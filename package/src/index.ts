import { BunnyContainer } from "./BunnyContainer";
import BunnyElement from "./elements/BunnyElement";

/**
 * Clase para manejar eventos DOM
 */
class BunnyDom {
  /**
   * Ejecuta una función cuando el DOM está listo
   * @param callback Función a ejecutar
   */
  ready(callback: () => void): void {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(callback, 1);
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }
}

/**
 * Crea una instancia de BunnyContainer con todos los métodos disponibles
 * y añade el método ready para eventos del DOM
 */
class BunnyRoot extends BunnyContainer {
  // Instancia de BunnyDom para manejar eventos DOM
  private domHandler: BunnyDom = new BunnyDom();

  /**
   * Ejecuta una función cuando el DOM está listo
   * @param callback Función a ejecutar
   */
  ready(callback: () => void): void {
    this.domHandler.ready(callback);
  }

  /**
   * Selecciona un elemento del DOM y lo convierte en un BunnyContainer
   * @param selector Selector CSS para encontrar el elemento
   * @returns Un nuevo BunnyContainer con el elemento encontrado como contexto, o null si no se encuentra
   */
  select(selector: string): BunnyContainer<HTMLElement> | null {
    return BunnyContainer.select(selector);
  }

  /**
   * Selecciona múltiples elementos del DOM y los convierte en un array de BunnyContainer
   * @param selector Selector CSS para encontrar los elementos
   * @returns Un array de BunnyContainer, uno por cada elemento encontrado
   */
  selectAll(selector: string): BunnyContainer<HTMLElement>[] {
    const elements = document.querySelectorAll(selector);
    const containers: BunnyContainer<HTMLElement>[] = [];

    elements.forEach((element) => {
      // Creamos un BunnyElement con la etiqueta correspondiente
      const bunnyElement = new BunnyElement<HTMLElement>(
        element.tagName.toLowerCase()
      );

      // Reemplazamos su elemento interno con el elemento DOM encontrado
      Object.defineProperty(bunnyElement, "element", {
        value: element,
        writable: false,
      });

      containers.push(new BunnyContainer(bunnyElement));
    });

    return containers;
  }
}

// Exportamos la instancia principal de BunnyRoot como 'bunny'
const bunny = new BunnyRoot();

export default bunny;
