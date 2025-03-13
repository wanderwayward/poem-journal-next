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
import { PoemStanzaType } from "@/features/poem/poemTypes";

interface PoemProps {
	poemData: PoemType;
	pages: PoemStanzaType[][];
	leftPage: PoemStanzaType[];
	rightPage: PoemStanzaType[];
}

const PoemColumns: React.FC<PoemProps> = ({
	pages,
	poemData,
	leftPage,
	rightPage,
}) => {
	const { title, author } = poemData;
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.secondary.dark, 0.97);

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
					width: "440px",
					margin: "0 auto",
					backgroundBlendMode: "multiply",
				}}
			>
				{leftPage == pages[0] ? (
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
				) : null}

				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{leftPage?.map((stanza) => (
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
					width: "440px",
					margin: "0 auto",
					backgroundBlendMode: "multiply",
				}}
			>
				<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
					{rightPage?.map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
			</Paper>
		</Box>
	) : null;
};

export default PoemColumns;
