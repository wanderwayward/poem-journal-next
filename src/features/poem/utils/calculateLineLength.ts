import { PoemStanzaType } from "../poemTypes";

export const calculateAverageLineLength = (
	stanzas: PoemStanzaType[]
): number => {
	const totalCharacters = stanzas.reduce(
		(charCount, stanza) =>
			charCount +
			stanza.children.reduce(
				(sum, line) => sum + line.children.map((t) => t.text).join("").length,
				0
			),
		0
	);
	const totalLines = stanzas.reduce(
		(lineCount, stanza) => lineCount + stanza.children.length,
		0
	);
	return totalLines > 0 ? totalCharacters / totalLines : 0;
};
