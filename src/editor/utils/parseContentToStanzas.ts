import { v4 as uuidv4 } from "uuid";
import { CustomElement, Descendant, CustomText } from "@/editor/Types";
import { isCustomElement } from "./typeGuards";

/**
 * Function to parse an array of Descendant elements into structured stanzas.
 * Each stanza contains lines of formatted text nodes. Empty lines separate stanzas.
 *
 * @param elements - Array of Descendant elements to process.
 * @returns An array of CustomElement stanzas with properly formatted children.
 */
function parseContentToStanzas(elements: Descendant[]): CustomElement[] {
	const stanzas: CustomElement[] = []; // Final list of stanzas to return
	let currentStanza = createNewStanza(); // Initialize the first stanza

	elements.forEach((element, index) => {
		// Only process elements that are CustomElements of type 'stanza'
		if (!isCustomElement(element) || element.type !== "stanza") {
			return; // Skip invalid or non-stanza elements
		}

		// Process each child (lines) of the stanza
		element.children.forEach((child) => {
			if (!isCustomElement(child) || child.type !== "line") return; // Skip invalid lines

			// Format all text nodes within the current line
			const formattedTextNodes = formatTextNodes(
				child.children as CustomText[]
			);

			// Check if the line is empty (all text nodes contain whitespace or are blank)
			if (isEmptyLine(formattedTextNodes)) {
				if (currentStanza.children.length > 0) {
					// If the current stanza has content, save it and start a new stanza
					stanzas.push(currentStanza);
					currentStanza = createNewStanza();
				}
			} else {
				// Non-empty line: Add the formatted line to the current stanza
				currentStanza.children.push({
					...child, // Copy the line element
					children: formattedTextNodes, // Add formatted text nodes
					id: uuidv4(), // Assign a unique ID to the line
				});
			}
		});

		// After processing all lines in this stanza, push the current stanza if it has content
		if (currentStanza.children.length > 0) {
			stanzas.push(currentStanza);
			currentStanza = createNewStanza();
		}
	});

	// Push the last stanza if there are any remaining lines
	if (currentStanza.children.length > 0) {
		stanzas.push(currentStanza);
	}

	return stanzas;
}

/**
 * Helper function to create a new empty stanza.
 * @returns A new CustomElement of type 'stanza'.
 */
function createNewStanza(): CustomElement {
	return { type: "stanza", id: uuidv4(), children: [] };
}

/**
 * Helper function to format text nodes in a line.
 * Ensures default values for styling properties (bold, italic, underline, alignment).
 *
 * @param textNodes - Array of CustomText nodes to format.
 * @returns An array of formatted CustomText nodes.
 */
function formatTextNodes(textNodes: CustomText[]): CustomText[] {
	return textNodes.map((node) => ({
		...node, // Copy existing properties
		bold: node.bold || false, // Default to false if undefined
		italic: node.italic || false, // Default to false if undefined
		underline: node.underline || false, // Default to false if undefined
		alignment: node.alignment || "left", // Default to "left" if undefined
	}));
}

/**
 * Helper function to check if a line is empty.
 * A line is empty if all text nodes contain only whitespace or are blank.
 *
 * @param textNodes - Array of CustomText nodes to check.
 * @returns True if the line is empty, false otherwise.
 */
function isEmptyLine(textNodes: CustomText[]): boolean {
	return textNodes.every((node) => node.text.trim() === "");
}

export default parseContentToStanzas;
