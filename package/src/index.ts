import { BunnyContainer } from "./BunnyContainer";
import BunnyElement from "./elements/BunnyElement";

// Tipo para los listeners de cambio de estado
type StateChangeListener<T> = (newValue: T, oldValue: T) => void;

// Tipo para representar un objeto de estado
interface StateObject<T> {
  value: T;
  listeners: StateChangeListener<T>[];
}

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

  // Almacén de estados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private stateStore: Map<string, StateObject<any>> = new Map();

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

  /**
   * Crea un nuevo estado gestionado
   * @param key Identificador único para el estado
   * @param initialValue Valor inicial del estado
   * @returns Un objeto con métodos para interactuar con el estado
   */
  createState<T>(key: string, initialValue: T) {
    if (this.stateStore.has(key)) {
      console.warn(
        `El estado con clave '${key}' ya existe. Se devolverá el estado existente.`
      );
      return this.getStateController<T>(key);
    }

    const stateObject: StateObject<T> = {
      value: initialValue,
      listeners: [],
    };

    this.stateStore.set(key, stateObject);
    return this.getStateController<T>(key);
  }

  /**
   * Obtiene un controlador para un estado existente
   * @param key Identificador del estado
   * @returns Un objeto con métodos para interactuar con el estado
   * @throws Error si el estado no existe
   */
  getState<T>(key: string) {
    if (!this.stateStore.has(key)) {
      throw new Error(`No existe un estado con la clave '${key}'.`);
    }

    return this.getStateController<T>(key);
  }

  /**
   * Comprueba si existe un estado con la clave especificada
   * @param key Identificador del estado
   * @returns true si el estado existe, false en caso contrario
   */
  hasState(key: string): boolean {
    return this.stateStore.has(key);
  }

  /**
   * Elimina un estado
   * @param key Identificador del estado
   * @returns true si se eliminó correctamente, false si no existía
   */
  removeState(key: string): boolean {
    return this.stateStore.delete(key);
  }

  /**
   * Obtiene todos los identificadores de estado
   * @returns Array con las claves de todos los estados
   */
  getAllStateKeys(): string[] {
    return Array.from(this.stateStore.keys());
  }

  /**
   * Método interno para crear un controlador de estado
   * @param key Identificador del estado
   * @returns Controlador de estado
   */
  private getStateController<T>(key: string) {
    const stateObject = this.stateStore.get(key) as StateObject<T>;

    return {
      /**
       * Obtiene el valor actual del estado
       * @returns El valor actual
       */
      get: (): T => stateObject.value,

      /**
       * Establece un nuevo valor para el estado
       * @param newValue Nuevo valor
       */
      set: (newValue: T): void => {
        const oldValue = stateObject.value;
        stateObject.value = newValue;

        // Notificar a todos los listeners del cambio
        stateObject.listeners.forEach((listener) => {
          listener(newValue, oldValue);
        });
      },

      /**
       * Actualiza el estado mediante una función
       * @param updateFn Función que recibe el valor actual y devuelve el nuevo valor
       */
      update: (updateFn: (currentValue: T) => T): void => {
        const oldValue = stateObject.value;
        const newValue = updateFn(oldValue);
        stateObject.value = newValue;

        // Notificar a todos los listeners del cambio
        stateObject.listeners.forEach((listener) => {
          listener(newValue, oldValue);
        });
      },

      /**
       * Suscribe una función para ser notificada cuando cambie el estado
       * @param listener Función a llamar cuando cambie el estado
       * @returns Función para cancelar la suscripción
       */
      subscribe: (listener: StateChangeListener<T>): (() => void) => {
        stateObject.listeners.push(listener);

        // Devolver función para cancelar la suscripción
        return () => {
          const index = stateObject.listeners.indexOf(listener);
          if (index !== -1) {
            stateObject.listeners.splice(index, 1);
          }
        };
      },

      /**
       * Vincula el estado a un elemento BunnyContainer
       * @param container BunnyContainer o selector para crear/obtener un BunnyContainer
       * @param bindingFn Función que actualiza el elemento cuando cambia el estado
       * @returns Función para cancelar la vinculación
       */
      bind: (
        container: string | BunnyContainer<HTMLElement>,
        bindingFn: (container: BunnyContainer<HTMLElement>, value: T) => void
      ): (() => void) => {
        let targetContainer: BunnyContainer<HTMLElement> | null = null;

        // Resolver el BunnyContainer según el tipo de parámetro
        if (typeof container === "string") {
          targetContainer = BunnyContainer.select(container);
          if (!targetContainer) {
            console.error(
              `No se pudo encontrar un elemento para el selector: ${container}`
            );
            return () => {}; // Función vacía como fallback
          }
        } else if (container instanceof BunnyContainer) {
          targetContainer = container;
        } else {
          console.error(
            "El parámetro debe ser un selector o un BunnyContainer"
          );
          return () => {}; // Función vacía como fallback
        }

        // Crear el listener que actualizará el contenedor
        const listener: StateChangeListener<T> = (newValue) => {
          bindingFn(targetContainer as BunnyContainer<HTMLElement>, newValue);
        };

        // Aplicar el valor inicial
        bindingFn(targetContainer, stateObject.value);

        // Suscribirse a cambios futuros
        return this.getStateController<T>(key).subscribe(listener);
      },
    };
  }
}

// Exportamos la instancia principal de BunnyRoot como 'bunny'
const bunny = new BunnyRoot();

export default bunny;
