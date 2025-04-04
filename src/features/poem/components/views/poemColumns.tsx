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
import { AnimatePresence, motion } from "framer-motion";

interface PoemProps {
	poemData: PoemType;
	pages: PoemStanzaType[][];
	currentPage: number;
}

const PoemColumns: React.FC<PoemProps> = ({ pages, poemData, currentPage }) => {
	const { title, author } = poemData;
	const theme = useTheme();
	const backgroundColor = theme.palette.secondary.dark;
	const styles = {
		container: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			gap: "1em",
		},
		paper: {
			height: poemData.longLines ? "520px" : "540px",
			width: poemData.longLines ? "440px" : "420px",
			position: "relative",
			backgroundColor: backgroundColor,
			padding: "20px",
			textAlign: "center",
			backgroundBlendMode: "multiply",
			margin: "0 auto",
		},
		title: {
			color: theme.palette.primary.contrastText,
			wordWrap: "break-word",
			overflowWrap: "break-word",
			width: "100%",
			textAlign: "left",
			display: "flex",
			justifyContent: "start",
			pl: ".1em",
			fontWeight: "bold",
		},
		author: {
			pl: "1.5em",
			lineHeight: ".9em",
			fontSize: ".8em",
			fontWeight: "bold",
			width: "100%",
			textAlign: "left",
		},
		stanzaContainer: {
			py: ".2em",
			pl: ".5em",
		},
		pageIndicatorLeft: {
			position: "absolute",
			bottom: 4,
			left: 12,
			fontSize: "0.8em",
			color: theme.palette.primary.contrastText,
		},
		pageIndicatorRight: {
			position: "absolute",
			bottom: 4,
			right: 12,
			fontSize: "0.8em",
			color: theme.palette.primary.contrastText,
		},
	};

	const leftPage = pages[currentPage] || [];
	const rightPage = pages[currentPage + 1] || [];

	return poemData ? (
		<Box sx={styles.container}>
			<Paper elevation={3} sx={styles.paper}>
				{currentPage === 0 ? (
					<Box>
						<Typography variant="h4" sx={styles.title}>
							{title}
						</Typography>
						<Typography variant="body2" color="contrastText" sx={styles.author}>
							by {author}
						</Typography>
					</Box>
				) : null}

				<Container sx={styles.stanzaContainer} disableGutters>
					{leftPage?.map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
				{/* <Box sx={styles.pageIndicatorLeft}>
					{currentPage + 1}/{pages.length}
				</Box> */}
			</Paper>

			<Paper elevation={3} sx={styles.paper}>
				<Container sx={styles.stanzaContainer} disableGutters>
					{rightPage?.map((stanza) => (
						<Stanza key={stanza.id} stanza={stanza} />
					))}
				</Container>
				{/* <Box sx={styles.pageIndicatorRight}>
					{currentPage + 2}/{pages.length}
				</Box> */}
			</Paper>
		</Box>
	) : null;
};

export default PoemColumns;
