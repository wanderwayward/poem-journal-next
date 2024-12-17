import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Stanza from "./elements/Stanza/Stanza";
import { PoemType } from "@/features/poem/poemTypes";

interface PoemProps {
	poemData: PoemType;
}

const Poem: React.FC<PoemProps> = ({ poemData }) => {
	return poemData ? (
		<>
			<Typography
				variant="h4"
				sx={{
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
				color="textSecondary"
				sx={{
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
		</>
	) : null;
};

export default Poem;
