import React from "react";
import { Container, Typography, Paper, useTheme, alpha } from "@mui/material";
import Stanza from "./elements/Stanza/Stanza";
import { PoemType } from "@/features/poem/poemTypes";

interface PoemProps {
	poemData: PoemType;
}

const Poem: React.FC<PoemProps> = ({ poemData }) => {
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.secondary.dark, 0.97);

	return poemData ? (
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
				backgroundBlendMode: "multiply", // Optional: controls how color & gradient blend
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
				{poemData.stanzas.map((stanza) => (
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
	) : null;
};

export default Poem;
