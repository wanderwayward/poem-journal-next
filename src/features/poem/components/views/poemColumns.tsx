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
					backgroundBlendMode: "multiply",
				}}
			>
				<Box>
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
					<Typography
						variant="body2"
						color="contrastText"
						sx={{
							pl: "2em",
							lineHeight: "1em",
							fontSize: ".8em",
							fontWeight: "bold",
							width: "100%",
							textAlign: "left",
						}}
					>
						by {poemData.author}
					</Typography>
				</Box>

				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{splitPages[0].map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
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
