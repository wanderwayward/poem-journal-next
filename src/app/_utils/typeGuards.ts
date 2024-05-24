import { CustomElement, Descendant } from "../_types/Types" 

export function isCustomElement(
  descendant: Descendant
): descendant is CustomElement {
  return "type" in descendant && "children" in descendant;
}
