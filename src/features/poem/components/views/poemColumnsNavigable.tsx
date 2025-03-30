import React from "react";
import { Box, Paper, Container, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Stanza from "../elements/Stanza/Stanza";
import { PoemType, PoemStanzaType } from "@/features/poem/poemTypes";

// Animation variants for left column (reduced vertical offset)
const leftVariants = {
	initial: (custom: { offset: number }) => ({
		x: -custom.offset,
		y: -custom.offset * 0.12,
	}),
	animate: (custom: { offset: number }) => ({
		x: -custom.offset,
		y: -custom.offset * 0.12,
	}),
	exit: (custom: { offset: number; navDirection: "left" | "right" }) =>
		custom.navDirection === "right"
			? {
					x: custom.offset,
					y: custom.offset * 0.12,
					transition: { duration: 0.4, ease: "easeInOut" },
			  }
			: {
					x: -custom.offset,
					y: -custom.offset * 0.12,
					transition: { duration: 0.4, ease: "easeInOut" },
			  },
};

// Animation variants for right column (reduced vertical offset)
const rightVariants = {
	initial: (custom: { offset: number }) => ({
		x: custom.offset,
		y: custom.offset * 0.12,
	}),
	animate: (custom: { offset: number }) => ({
		x: custom.offset,
		y: custom.offset * 0.12,
	}),
	exit: (custom: { offset: number; navDirection: "left" | "right" }) =>
		custom.navDirection === "left"
			? {
					x: -custom.offset,
					y: -custom.offset * 0.12,
					transition: { duration: 0.4, ease: "easeInOut" },
			  }
			: {
					x: custom.offset,
					y: custom.offset * 0.12,
					transition: { duration: 0.4, ease: "easeInOut" },
			  },
};

interface PoemColumnsNavigableProps {
	pages: PoemStanzaType[][];
	poemData: PoemType;
	currentPage: number;
	navDirection: "left" | "right";
	handlePageChange: (direction: "left" | "right") => void;
}

const PoemColumnsNavigable: React.FC<PoemColumnsNavigableProps> = ({
	pages,
	poemData,
	currentPage,
	navDirection,
	handlePageChange,
}) => {
	const theme = useTheme();
	const backgroundColor = theme.palette.secondary.dark;

	// Container mimicking the static layout of two columns
	const styles = {
		pagePaper: {
			height: poemData.longLines ? "520px" : "540px",
			width: poemData.longLines ? "440px" : "420px",
			position: "relative" as const,
			backgroundColor: backgroundColor,
			padding: "20px",
			textAlign: "center" as const,
			backgroundBlendMode: "multiply" as const,
		},
		column: {
			position: "relative" as const,
			width: poemData.longLines ? "440px" : "420px",
			height: poemData.longLines ? "520px" : "540px",
		},
		container: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			position: "relative",
			justifyContent: "space-around",
		},
	};

	// Left and right page stacks for animation
	const leftStack = pages.slice(0, currentPage + 1);
	const rightStack = pages.slice(currentPage + 1);

	// Dynamic base z-index values based on navigation direction
	const leftBaseZ = navDirection !== "right" ? 100 : 50;
	const rightBaseZ = navDirection !== "right" ? 50 : 100;

	return (
		<>
			{/* Left Column */}
			<Box sx={styles.column}>
				<AnimatePresence>
					{leftStack
						.slice()
						.reverse()
						.map((pageContent, i) => {
							const isTopCard = i === 0;
							const offset = i * 1.1;
							const zIndex = leftBaseZ + (leftStack.length - i);

							return (
								<motion.div
									key={`left-${currentPage - i}`}
									style={{
										position: "absolute",
										top: 0,
										right: 10,
										width: "100%",
										zIndex,
									}}
									custom={{ offset, navDirection }}
									variants={leftVariants}
									initial="initial"
									animate="animate"
									exit={isTopCard ? "exit" : undefined}
								>
									<Paper sx={styles.pagePaper}>
										{currentPage === 0 && isTopCard && (
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
														pl: ".1em",
														fontWeight: "bold",
													}}
												>
													{poemData.title}
												</Typography>
												<Typography
													variant="body2"
													sx={{
														pl: "1.5em",
														lineHeight: ".9em",
														fontSize: ".8em",
														fontWeight: "bold",
														width: "100%",
														textAlign: "left",
													}}
												>
													by {poemData.author}
												</Typography>
											</Box>
										)}
										<Container disableGutters>
											{pageContent.map((stanza) => (
												<Stanza key={stanza.id} stanza={stanza} />
											))}
										</Container>
										{/* Left page indicator */}
										{isTopCard && (
											<Box
												sx={{
													position: "absolute",
													bottom: 4,
													left: 12,
													fontSize: "0.8em",
													color: theme.palette.primary.contrastText,
												}}
											>
												{currentPage + 1}/{pages.length}
											</Box>
										)}
									</Paper>
								</motion.div>
							);
						})}
				</AnimatePresence>
			</Box>

			{/* Right Column */}
			<Box sx={styles.column}>
				<AnimatePresence mode="wait">
					{rightStack.map((pageContent, idx) => {
						const isTopCard = idx === 0;
						const offset = idx * 1.1;
						const zIndex = rightBaseZ + (rightStack.length - idx);

						return (
							<motion.div
								key={`right-${currentPage + 1 + idx}`}
								style={{
									position: "absolute",
									top: 0,
									left: 10,
									width: "100%",
									zIndex,
								}}
								custom={{ offset, navDirection }}
								variants={rightVariants}
								initial="initial"
								animate="animate"
								exit={isTopCard ? "exit" : undefined}
							>
								<Paper sx={styles.pagePaper}>
									<Container disableGutters>
										{pageContent.map((stanza) => (
											<Stanza key={stanza.id} stanza={stanza} />
										))}
									</Container>
									{/* Right page indicator */}
									{isTopCard && (
										<Box
											sx={{
												position: "absolute",
												bottom: 4,
												right: 12,
												fontSize: "0.8em",
												color: theme.palette.primary.contrastText,
											}}
										>
											{currentPage + 2}/{pages.length}
										</Box>
									)}
								</Paper>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</Box>
		</>
	);
};

export default PoemColumnsNavigable;
