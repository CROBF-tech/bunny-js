/**
 * Bunny - Una librería minimalista para manipulación del DOM en TypeScript
 */

import BunnyElement from "./elements/BunnyElement";
import BunnyDiv from "./elements/BunnyDiv";
import BunnyParagraph from "./elements/BunnyParagraph";
import BunnyInput from "./elements/BunnyInput";
import BunnyButton from "./elements/BunnyButton";
import BunnyTable from "./elements/BunnyTable";
import BunnyRow from "./elements/BunnyRow";
import BunnyTableHead from "./elements/BunnyTableHead";
import BunnyTableField from "./elements/BunnyTableField";

/**
 * Objeto global para crear instancias de elementos Bunny
 */
const bunny = {
  /**
   * Crea un elemento genérico
   * @param tagName Nombre de etiqueta HTML
   * @returns Nueva instancia de BunnyElement
   */
  element<T extends HTMLElement>(tagName: string): BunnyElement<T> {
    return new BunnyElement<T>(tagName);
  },

  /**
   * Crea un div
   * @returns Nueva instancia de BunnyDiv
   */
  div(): BunnyDiv {
    return new BunnyDiv();
  },

  /**
   * Crea un párrafo
   * @returns Nueva instancia de BunnyParagraph
   */
  p(): BunnyParagraph {
    return new BunnyParagraph();
  },

  /**
   * Crea un input
   * @param type Tipo de input
   * @returns Nueva instancia de BunnyInput
   */
  input(type: string = "text"): BunnyInput {
    return new BunnyInput(type);
  },

  /**
   * Crea un botón
   * @returns Nueva instancia de BunnyButton
   */
  button(): BunnyButton {
    return new BunnyButton();
  },

  /**
   * Crea una tabla
   * @returns Nueva instancia de BunnyTable
   */
  table(): BunnyTable {
    return new BunnyTable();
  },

  /**
   * Crea una fila de tabla
   * @returns Nueva instancia de BunnyRow
   */
  row(): BunnyRow {
    return new BunnyRow();
  },

  /**
   * Crea una celda de encabezado
   * @returns Nueva instancia de BunnyTableHead
   */
  th(): BunnyTableHead {
    return new BunnyTableHead();
  },

  /**
   * Crea una celda de datos
   * @returns Nueva instancia de BunnyTableField
   */
  td(): BunnyTableField {
    return new BunnyTableField();
  },
};

// Exportaciones para uso en módulos
export {
  BunnyElement,
  BunnyDiv,
  BunnyParagraph,
  BunnyInput,
  BunnyButton,
  BunnyTable,
  BunnyRow,
  BunnyTableHead,
  BunnyTableField,
  bunny,
};
