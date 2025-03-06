import React, { useEffect, useState } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	useTheme,
	alpha,
} from "@mui/material";
import Stanza from "../elements/Stanza/Stanza";
import { PoemType, PoemStanzaType } from "@/features/poem/poemTypes";
import { set } from "lodash";

interface PoemProps {
	poemData: PoemType;
}

const PoemColumns: React.FC<PoemProps> = ({ poemData }) => {
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.secondary.dark, 0.97);

	const splitPoemIntoPages = (poemData: PoemType): PoemStanzaType[][] => {
		const { stanzas } = poemData;
		const pages: PoemStanzaType[][] = [];
		let currentPage: PoemStanzaType[] = [];
		let currentLineCount = 0;

		for (const stanza of stanzas) {
			const stanzaLineCount = stanza.children.length;

			// If adding this stanza pushes past 18 lines...
			if (currentLineCount + stanzaLineCount > 18) {
				// If the current page has at least 16 lines, finalize it
				if (currentLineCount >= 16) {
					pages.push(currentPage);
					currentPage = [];
					currentLineCount = 0;
				}

				// Handle oversized stanza (if it doesn't fit cleanly)
				let remainingLines = stanza.children;
				let splitPart = 1;

				while (remainingLines.length > 0) {
					// Take the next chunk of lines (but ensure we don’t go under 13)
					const availableSpace = 18 - currentLineCount;
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
					if (currentLineCount >= 16) {
						pages.push(currentPage);
						currentPage = [];
						currentLineCount = 0;
					}

					splitPart++; // Increment split part for tracking
				}
			} else {
				// If it fits, just add the stanza normally
				currentPage.push(stanza);
				currentLineCount += stanzaLineCount;
			}
		}

		// Adjust last page if it’s too small (below 15 lines)
		if (pages.length > 1 && currentPage.length > 0 && currentLineCount < 13) {
			const prevPage = pages[pages.length - 1];

			// Move lines from the previous page to balance out
			while (prevPage.length > 1 && currentLineCount < 13) {
				const lastStanza = prevPage.pop();
				if (lastStanza) {
					currentPage.unshift(lastStanza);
					currentLineCount += lastStanza.children.length;
				}
			}
		}

		// Push the last page if there are any remaining stanzas
		if (currentPage.length > 0) {
			pages.push(currentPage);
		}

		return pages;
	};
	const [splitPages, setSplitPages] = useState(() =>
		splitPoemIntoPages(poemData)
	);

	useEffect(() => {
		setSplitPages(splitPoemIntoPages(poemData));
	}, [poemData]);

	return poemData ? (
		<Box sx={{ display: "flex", flexDirection: "row", gap: "1em" }}>
			<Paper
				elevation={3}
				sx={{
					backgroundColor: backgroundColor,
					backgroundImage: `linear-gradient(to bottom, ${alpha(
						theme.palette.primary.main,
						0.1
					)}, ${alpha(theme.palette.primary.dark, 0.1)})`,
					padding: "20px",
					textAlign: "center",
					maxWidth: "100%",
					margin: "0 auto",
					backgroundBlendMode: "multiply", //  controls how color & gradient blend. Multiply looks nice, but there's also screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, and luminosity.  I've tried most of them and multiply looks the best.
				}}
			>
				<Typography
					variant="h4"
					sx={{
						color: theme.palette.primary.contrastText,
						wordWrap: "break-word",
						overflowWrap: "break-word",
						width: "100%",
						textAlign: "left",
						display: "flex",
						justifyContent: "start",
						pl: ".2em",
						fontWeight: "bold",
					}}
				>
					{poemData.title}
				</Typography>

				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{splitPages[0].map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
				<Typography
					variant="body2"
					color="contrastText"
					sx={{
						fontSize: ".8em",
						fontWeight: "bold",
						width: "100%",
						textAlign: "right",
					}}
				>
					by {poemData.author}
				</Typography>
			</Paper>
			<Paper
				elevation={3}
				sx={{
					backgroundColor: backgroundColor,
					backgroundImage: `linear-gradient(to bottom, ${alpha(
						theme.palette.primary.main,
						0.1
					)}, ${alpha(theme.palette.primary.dark, 0.1)})`,
					padding: "20px",
					textAlign: "center",
					maxWidth: "100%",
					margin: "0 auto",
					backgroundBlendMode: "multiply", //  controls how color & gradient blend. Multiply looks nice, but there's also screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, and luminosity.  I've tried most of them and multiply looks the best.
				}}
			>
				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{splitPages[1].map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
			</Paper>
		</Box>
	) : null;
};

export default PoemColumns;
