"use client";
import React, { useEffect, useState, useCallback, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Poem from "@/features/poem/components/Poem";
import { PoemType, PoemStanzaType } from "@/features/poem/poemTypes";
import {
	Container,
	CircularProgress,
	Button,
	Box,
	Typography,
	Chip,
	Paper,
	useTheme,
	alpha,
} from "@mui/material";
import { useUser } from "@/features/user/context/UserContext";
import PoemColumns from "@/features/poem/components/views/poemColumns";
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
	const leftPage = pages[currentPage];
	const rightPage = pages[currentPage + 1];

	const handlePageChange = (direction: "left" | "right") => {
		setCurrentPage(
			(
				prev // This is a function that takes the previous state as an argument and returns the new state
			) =>
				direction === "left" // If the direction is left
					? Math.max(0, prev - 1) // Since we are going left we need to subtract 1 from the previous page number, but we don't want to go past the first page, so we use Math.max to compare the previous page number to 0.
					: Math.min(pages.length - 2, prev + 1) // If the direction is right, we add 1 to the previous page number, but we don't want to go past the last page so we use Math.min to compare the previous page number to the last page number.
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

	if (loading) {
		return (
			<Container
				maxWidth="md"
				sx={{
					padding: "20px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<CircularProgress color="error" size="lg" />
			</Container>
		);
	}

	if (error) {
		return (
			<Container maxWidth="md" sx={{ padding: "20px" }}>
				<Typography color="error">{error}</Typography>
			</Container>
		);
	}

	const styles = {
		container: (lineCount: number) => ({
			maxWidth: lineCount > 20 ? "lg" : "sm",
		}),
		paper: {
			elevation: 3,
			backgroundColor: backgroundColor,
			padding: "20px",
			paddingX: "0px",
			textAlign: "center",
			maxWidth: "100%",
			margin: "0 auto",
		},
		tagsContainer: {
			display: "flex",
			justifyContent: "start",
			width: "100%",
		},
		tagsBox: {
			textAlign: "left",
			padding: "20px",
		},
		tagsList: {
			marginTop: "5px",
			display: "flex",
			flexWrap: "wrap",
			gap: "5px",
		},
		buttonsContainer: {
			marginTop: "20px",
			display: "flex",
			justifyContent: "center",
			gap: "5em",
		},
		noPoemContainer: {
			maxWidth: "md",
			padding: "20px",
		},
	};

	return poemData ? (
		<Container sx={styles.container(poemData.lineCount)}>
			<Paper sx={styles.paper}>
				{poemData.lineCount > 20 ? (
					poemData.pageCount > 2 ? (
						<PagedPoemNavigation
							handlePageChange={handlePageChange}
							currentPage={currentPage}
							pages={pages}
						>
							<PoemColumns
								pages={pages}
								leftPage={leftPage}
								rightPage={rightPage}
								poemData={poemData}
							/>
						</PagedPoemNavigation>
					) : (
						<PoemColumns
							pages={pages}
							leftPage={leftPage}
							rightPage={rightPage}
							poemData={poemData}
						/>
					)
				) : (
					<Poem poemData={poemData} />
				)}

				{poemData.tags && poemData.tags.length > 0 && (
					<Box sx={styles.tagsContainer}>
						<Box sx={styles.tagsBox}>
							<Typography variant="subtitle1">Tags:</Typography>
							<Box sx={styles.tagsList}>
								{poemData.tags.map((tag) => (
									<Chip key={tag} label={tag} color="warning" />
								))}
							</Box>
						</Box>
					</Box>
				)}

				{user && (
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
				)}
			</Paper>
		</Container>
	) : (
		<Container sx={styles.noPoemContainer}>
			<Typography>No poem found</Typography>
		</Container>
	);
};

export default PoemPage;
