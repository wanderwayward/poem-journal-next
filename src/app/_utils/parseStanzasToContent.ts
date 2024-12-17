import { Descendant } from "slate";
import { CustomElement, CustomText } from "../_types/Types";

function parseStanzasToContent(stanzas: CustomElement[]): Descendant[] {
  return stanzas.map((stanza: CustomElement) => ({
    type: "stanza",
    children: stanza.children.map((line) => {
      if ((line as CustomElement).type === "line") {
        return {
          type: "line",
          children: (line as CustomElement).children.map((textNode) => ({
            text: (textNode as CustomText).text,
            bold: (textNode as CustomText).bold || false,
            italic: (textNode as CustomText).italic || false,
            underline: (textNode as CustomText).underline || false,
            alignment: (textNode as CustomText).alignment || "left",
          })),
        };
      } else {
        // Handle unexpected structure or return the original line
        return line;
      }
    }),
  }));
}

export default parseStanzasToContent;
