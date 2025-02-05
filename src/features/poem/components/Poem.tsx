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
				padding: "20px",
				textAlign: "center",
				maxWidth: "100%",
				margin: "0 auto",
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
				}}
			>
				{poemData.title}
			</Typography>
			<Typography
				variant="body2"
				color="contrastText"
				sx={{
					fontWeight: "bold",
					width: "100%",
					textAlign: "left",
					pl: ".7em",
				}}
			>
				{poemData.type === "Original" ? poemData.type : null} by{" "}
				{poemData.author}
			</Typography>
			<Container sx={{ py: "1em", pl: ".7em" }} disableGutters>
				{poemData.stanzas.map((stanza) => (
					<Stanza key={stanza.id} stanza={stanza} />
				))}
			</Container>
		</Paper>
	) : null;
};

export default Poem;
