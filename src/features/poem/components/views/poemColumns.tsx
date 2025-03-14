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
	const backgroundColor = alpha(theme.palette.secondary.dark, 0.97);
	const styles = {
		container: {
			display: "flex",
			flexDirection: "row",
			gap: "1em",
		},
		paper: {
			position: "relative",
			backgroundColor: backgroundColor,
			backgroundImage: `linear-gradient(to bottom, ${alpha(
				theme.palette.primary.main,
				0.1
			)}, ${alpha(theme.palette.primary.dark, 0.1)})`,
			padding: "20px",
			textAlign: "center",
			width: "440px",
			backgroundBlendMode: "multiply",
			margin: "0 auto",
			transform: "translateY(5px) scale(0.98)", // ✅ Makes the next/prev pages slightly lower and smaller
			opacity: 0.8, // ✅ Slight transparency for stacked effect
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
	const prevPage = pages[currentPage - 1] || null; // ✅ Keep track of previous
	const nextPage = pages[currentPage + 2] || null; // ✅ Keep track of next

	const pageVariants = {
		initial: (direction: number) => ({
			x: direction > 0 ? "50%" : "-50%", // ✅ Page starts slightly offset but still visible
			opacity: 0.9, // ✅ Slight fade-in, but NOT from offscreen
		}),
		animate: {
			x: "0%",
			opacity: 1,
			transition: { duration: 0.4, ease: "easeInOut" },
		},
		exit: (direction: number) => ({
			x: direction > 0 ? "-50%" : "50%", // ✅ Page moves slightly away but doesn’t disappear offscreen
			opacity: 0.9,
			transition: { duration: 0.4, ease: "easeInOut" },
		}),
	};

	return poemData ? (
		<Box sx={styles.container}>
			<AnimatePresence mode="popLayout" custom={currentPage}>
				<motion.div
					key={`left-${currentPage}`}
					custom={1}
					initial="initial"
					animate="animate"
					exit="exit"
					variants={pageVariants}
				>
					<Paper elevation={3} sx={styles.paper}>
						{currentPage === 0 ? (
							<Box>
								<Typography variant="h4" sx={styles.title}>
									{title}
								</Typography>
								<Typography
									variant="body2"
									color="contrastText"
									sx={styles.author}
								>
									by {author}
								</Typography>
							</Box>
						) : null}

						<Container sx={styles.stanzaContainer} disableGutters>
							{leftPage?.map((stanza) => (
								<Stanza key={stanza.id} stanza={stanza} />
							))}
						</Container>
						<Box sx={styles.pageIndicatorLeft}>
							{currentPage + 1}/{pages.length}
						</Box>
					</Paper>
				</motion.div>
			</AnimatePresence>

			<AnimatePresence mode="popLayout" custom={currentPage}>
				<motion.div
					key={`right-${currentPage}`}
					custom={-1} // Leftward movement
					initial="initial"
					animate="animate"
					exit="exit"
					variants={pageVariants}
				>
					<Paper elevation={3} sx={styles.paper}>
						<Container sx={styles.stanzaContainer} disableGutters>
							{rightPage?.map((stanza) => (
								<Stanza key={stanza.id} stanza={stanza} />
							))}
						</Container>
						<Box sx={styles.pageIndicatorRight}>
							{currentPage + 2}/{pages.length}
						</Box>
					</Paper>
				</motion.div>
			</AnimatePresence>
		</Box>
	) : null;
};

export default PoemColumns;
