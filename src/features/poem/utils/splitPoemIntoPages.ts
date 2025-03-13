import { PoemStanzaType } from "../poemTypes";

export const splitPoemIntoPages = (
	stanzas: PoemStanzaType[],
	returnPageCountOnly = false,
	longLines = false
): PoemStanzaType[][] | number => {
	const pages: PoemStanzaType[][] = [];
	let currentPage: PoemStanzaType[] = [];
	let currentLineCount = 0;

	// Adjust limits based on line length type
	let firstPageMax = longLines ? 10 : 16;
	let normalPageMax = longLines ? 12 : 18;
	let minLines = { first: longLines ? 8 : 11, normal: longLines ? 9 : 13 };

	let firstPage = true;
	let maxLines = firstPageMax;

	for (const stanza of stanzas) {
		const stanzaLineCount = stanza.children.length;

		if (currentLineCount + stanzaLineCount > maxLines) {
			if (currentLineCount >= (firstPage ? minLines.first : minLines.normal)) {
				pages.push(currentPage);
				currentPage = [];
				currentLineCount = 0;
				firstPage = false;
				maxLines = normalPageMax;
			}

			if (stanzaLineCount <= maxLines) {
				currentPage.push(stanza);
				currentLineCount += stanzaLineCount;
				continue;
			}

			let remainingLines = stanza.children;
			let splitPart = 1;

			while (remainingLines.length > 0) {
				const availableSpace = maxLines - currentLineCount;
				const chunkSize = Math.min(remainingLines.length, availableSpace);
				const splitChunk = remainingLines.slice(0, chunkSize);
				remainingLines = remainingLines.slice(chunkSize);

				const splitStanza: PoemStanzaType & { splitPart?: number } = {
					...stanza,
					children: splitChunk,
					splitPart,
				};

				currentPage.push(splitStanza);
				currentLineCount += chunkSize;

				if (
					currentLineCount >= (firstPage ? minLines.first : minLines.normal)
				) {
					pages.push(currentPage);
					currentPage = [];
					currentLineCount = 0;
					firstPage = false;
					maxLines = normalPageMax;
				}

				splitPart++;
			}
		} else {
			currentPage.push(stanza);
			currentLineCount += stanzaLineCount;
		}
	}

	if (currentPage.length > 0) {
		pages.push(currentPage);
	}

	return returnPageCountOnly ? pages.length : pages;
};
