"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Poem from "@/features/poem/components/Poem";
import { PoemType, PoemStanzaType } from "@/features/poem/poemTypes";
import {
	Container,
	CircularProgress,
	Button,
	IconButton,
	Box,
	Typography,
	Chip,
	Paper,
	useTheme,
	alpha,
} from "@mui/material";
import { useUser } from "@/features/user/context/UserContext";
import PoemColumns from "@/features/poem/components/views/poemColumns";
import PoemColumnsNavigable from "@/features/poem/components/views/poemColumnsNavigable";
import PagedPoemNavigation from "@/features/poem/components/elements/NavigationButtons/PagedPoemNavigation";
import { splitPoemIntoPages } from "@/features/poem/utils/splitPoemIntoPages";

const PoemPage = () => {
	const params = useParams();
	const router = useRouter();
	const id = params?.id as string | undefined;
	const { user } = useUser();

	const [poemData, setPoemData] = useState<PoemType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [pages, setPages] = useState<PoemStanzaType[][]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	// New state to track navigation direction:
	const [navDirection, setNavDirection] = useState<"left" | "right">("right");

	const handlePageChange = (direction: "left" | "right") => {
		setNavDirection(direction);
		setCurrentPage(
			(prev) =>
				direction === "left"
					? Math.max(0, prev - 1) // Prevents going before page 0
					: Math.min(pages.length - 2, prev + 1) // Prevents going past last full spread
		);
	};

	const fetchPoem = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/poems/${id}`);
			const result = await response.json();
			if (result.status === "success") {
				setPoemData(result.data);
			} else {
				setError(result.message);
			}
		} catch (error) {
			setError("Failed to fetch poem");
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		if (id) {
			fetchPoem();
		}
	}, [id, fetchPoem]);

	useEffect(() => {
		if (poemData) {
			const { stanzas, longLines } = poemData;
			const splitPages = splitPoemIntoPages(stanzas, false, longLines);
			if (Array.isArray(splitPages)) {
				setPages(splitPages);
			}
		}
	}, [poemData]);

	const handleEditClick = () => {
		router.push(`/poem/${id}/edit`);
	};

	const handleDeleteClick = async () => {
		try {
			await fetch(`/api/poems/${id}`, {
				method: "DELETE",
			});
			router.push("/user");
		} catch (error) {
			console.error("Failed to delete poem:", error);
		}
	};

	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.background.paper, 0.95);

	const styles = {
		container: (pageCount: number) => ({
			width: pageCount > 2 ? "1500px" : pageCount > 1 ? "920px" : "auto",
		}),
		paper: {
			elevation: 3,
			backgroundColor: backgroundColor,
			padding: "20px",
			textAlign: "center",
			maxWidth: "100%",
			margin: "0 auto",
		},

		tagsBox: {
			textAlign: "left",
			padding: "20px",
			display: "flex",
			width: "100%",
			flexDirection: "row",
		},
		tagsList: {
			display: "flex",
			flexWrap: "wrap",
			gap: "5px",
			ml: "10px",
		},
		buttonsContainer: {
			//edit and delete
			marginTop: "20px",
			display: "flex",
			justifyContent: "center",
			gap: "5em",
		},
		noPoemContainer: {
			maxWidth: "md",
			padding: "20px",
		},
		buttonLeft: {},
		buttonRight: {},
		iconLeft: {
			zIndex: 200,
			position: "absolute",
			right: 5,
		},
		iconRight: {
			zIndex: 200,
			position: "absolute",
			left: 5,
			"&mui-background": {
				backgroundColor: theme.palette.background.paper,
				opacity: 0.8,
				transition: "background-color 0.3s ease",
			},
			"&:hover": {
				color: theme.palette.primary.main,
			},
		},
		navContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			position: "relative",
		},
	};

	return poemData ? (
		<Container sx={styles.container(poemData.pageCount)}>
			<Paper sx={styles.paper}>
				{poemData.lineCount > 20 ? (
					poemData.pageCount > 2 ? (
						<PagedPoemNavigation
							handlePageChange={handlePageChange}
							currentPage={currentPage}
							pages={pages}
							styles={styles}
						>
							<PoemColumnsNavigable
								pages={pages}
								poemData={poemData}
								currentPage={currentPage}
								navDirection={navDirection}
								handlePageChange={handlePageChange}
							/>
						</PagedPoemNavigation>
					) : (
						<PoemColumns
							pages={pages}
							poemData={poemData}
							currentPage={currentPage}
						/>
					)
				) : (
					<Poem poemData={poemData} />
				)}

				{poemData.tags && poemData.tags.length > 0 && (
					<Box sx={styles.tagsBox}>
						<Typography variant="subtitle1">Tags:</Typography>
						<Box sx={styles.tagsList}>
							{poemData.tags.map((tag) => (
								<Chip key={tag} label={tag} color="warning" />
							))}
						</Box>
					</Box>
				)}

				{/* {user && (
					<Box sx={styles.buttonsContainer}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleEditClick}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleDeleteClick}
						>
							Delete
						</Button>
					</Box>
				)} */}
			</Paper>
		</Container>
	) : (
		<Container sx={styles.noPoemContainer}>
			<Typography>No poem found</Typography>
		</Container>
	);
};

export default PoemPage;
