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
import { PoemType } from "@/features/poem/poemTypes";
import { splitPoemIntoPages } from "@/features/poem/utils/splitPoemIntoPages";
import { PoemStanzaType } from "@/features/poem/poemTypes";

interface PoemProps {
	poemData: PoemType;
}

const PoemColumns: React.FC<PoemProps> = ({ poemData }) => {
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.secondary.dark, 0.97);

	const { title, author, stanzas, longLines } = poemData;
	const [splitPages, setSplitPages] = useState<PoemStanzaType[][]>(
		() => splitPoemIntoPages(stanzas, false, longLines) as PoemStanzaType[][]
	);

	useEffect(() => {
		setSplitPages(
			splitPoemIntoPages(stanzas, false, longLines) as PoemStanzaType[][]
		);
	}, [stanzas]);

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
						{title}
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
						by {author}
					</Typography>
				</Box>

				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{splitPages[0]?.map((stanza) => (
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
					backgroundBlendMode: "multiply",
				}}
			>
				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{splitPages[1]?.map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
			</Paper>
		</Box>
	) : null;
};

export default PoemColumns;
