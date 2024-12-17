import { Descendant } from "slate";
import { CustomElement, CustomText } from "@/editor/Types";

/**
 * Function to transform an array of CustomElement stanzas into a flat array of Descendant elements.
 * Each stanza is converted into a "stanza" node containing its lines,
 * and each line's text nodes are normalized with proper defaults.
 *
 * @param stanzas - Array of CustomElement stanzas to transform.
 * @returns An array of Descendant elements representing the parsed content.
 */
function parseStanzasToContent(stanzas: CustomElement[]): Descendant[] {
	return stanzas.map((stanza: CustomElement) => ({
		type: "stanza", // Each stanza becomes a Descendant of type 'stanza'
		children: stanza.children.map((line) => {
			// Ensure each child within the stanza is processed as a line
			if ((line as CustomElement).type === "line") {
				return {
					type: "line", // Each line maintains its 'line' type
					children: (line as CustomElement).children.map((textNode) => {
						const text = textNode as CustomText; // Type assertion for clarity
						return {
							text: text.text, // Original text content
							bold: text.bold || false, // Default to false if undefined
							italic: text.italic || false, // Default to false if undefined
							underline: text.underline || false, // Default to false if undefined
							alignment: text.alignment || "left", // Default to "left" if undefined
						};
					}),
				};
			} else {
				// Fallback: If the child is not of type 'line', return it as is
				return line;
			}
		}),
	}));
}

export default parseStanzasToContent;
