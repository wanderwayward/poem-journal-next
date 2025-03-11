import { PoemStanzaType, PoemType } from "../poemTypes";

export const splitPoemIntoPages = (
	stanzas: PoemStanzaType[],
	returnPageCountOnly = false
): PoemStanzaType[][] | number => {
	const pages: PoemStanzaType[][] = [];
	let currentPage: PoemStanzaType[] = [];
	let currentLineCount = 0;

	// Special handling for first page
	let firstPage = true;
	let maxLines = 18; // First page limit is lower due to title and author

	for (const stanza of stanzas) {
		const stanzaLineCount = stanza.children.length;

		// If adding this stanza would exceed the max limit for this page...
		if (currentLineCount + stanzaLineCount > maxLines) {
			// If the current page has at least the min allowed lines, finalize it
			if (currentLineCount >= (firstPage ? 13 : 15)) {
				pages.push(currentPage);
				currentPage = [];
				currentLineCount = 0;

				// After first page, use normal max of 20 lines
				firstPage = false;
				maxLines = 20;
			}

			// Handle oversized stanza that doesn't fit cleanly
			let remainingLines = stanza.children;
			let splitPart = 1;

			while (remainingLines.length > 0) {
				// Take the next chunk of lines (adjust for first-page rules)
				const availableSpace = maxLines - currentLineCount;
				const chunkSize = Math.min(remainingLines.length, availableSpace);
				const splitChunk = remainingLines.slice(0, chunkSize);
				remainingLines = remainingLines.slice(chunkSize);

				// Create a split stanza entry
				const splitStanza: PoemStanzaType & { splitPart?: number } = {
					...stanza,
					children: splitChunk,
					splitPart,
				};

				currentPage.push(splitStanza);
				currentLineCount += chunkSize;

				// If we've filled this page, start a new one
				if (currentLineCount >= (firstPage ? 13 : 15)) {
					pages.push(currentPage);
					currentPage = [];
					currentLineCount = 0;

					// After first page, max lines become 20
					firstPage = false;
					maxLines = 20;
				}

				splitPart++; // Track split parts
			}
		} else {
			// If it fits, just add the stanza normally
			currentPage.push(stanza);
			currentLineCount += stanzaLineCount;
		}
	}

	// Push the last page, regardless of size (it can be smaller than 15)
	if (currentPage.length > 0) {
		pages.push(currentPage);
	}

	// Return only the number of pages if the flag is set
	return returnPageCountOnly ? pages.length : pages;
};
