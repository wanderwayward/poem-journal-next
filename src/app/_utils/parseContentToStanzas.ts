import { v4 as uuidv4 } from "uuid";
import { CustomElement, Descendant, CustomText } from "../_types/Types";
import { isCustomElement } from "./typeGuards";

function parseContentToStanzas(elements: Descendant[]): CustomElement[] {
  console.log("Parsing elements:", elements);

  const stanzas: CustomElement[] = [];
  let currentStanza: CustomElement = {
    type: "stanza",
    id: uuidv4(),
    children: [],
  };

  elements.forEach((element, index) => {
    if (isCustomElement(element) && element.type === "stanza") {
      element.children.forEach((child, childIndex) => {
        if (isCustomElement(child) && child.type === "line") {
          const textNodes = child.children as CustomText[];

          const formattedTextNodes = textNodes.map((textNode) => ({
            ...textNode,
            bold: textNode.bold || false,
            italic: textNode.italic || false,
            underline: textNode.underline || false,
            alignment: textNode.alignment || "left",
          }));

          if (
            formattedTextNodes.every((textNode) => textNode.text.trim() === "")
          ) {
            // Empty line: push current stanza and start a new one
            if (currentStanza.children.length > 0) {
              stanzas.push(currentStanza);
              currentStanza = {
                type: "stanza",
                id: uuidv4(),
                children: [],
              };
            }
          } else {
            // Non-empty line: add to current stanza with unique ID
            currentStanza.children.push({
              ...child,
              children: formattedTextNodes,
              id: uuidv4(),
            });
          }
        }
      });

      // After processing all children, push the stanza if it has content
      if (currentStanza.children.length > 0) {
        stanzas.push(currentStanza);
        currentStanza = {
          type: "stanza",
          id: uuidv4(),
          children: [],
        };
      }
    } else {
      console.log(`Element ${index} is not a stanza`);
    }
  });

  // Push the last stanza if it has content
  if (currentStanza.children.length > 0) {
    stanzas.push(currentStanza);
  }

  return stanzas;
}

export default parseContentToStanzas;
