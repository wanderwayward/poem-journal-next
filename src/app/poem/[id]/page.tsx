"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Poem from "@/features/poem/components/Poem";
import { PoemType } from "@/features/poem/poemTypes";
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

const PoemPage = () => {
	const params = useParams();
	const router = useRouter();
	const id = params?.id as string | undefined;
	const { user } = useUser();

	const [poemData, setPoemData] = useState<PoemType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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

	return poemData ? (
		<Container maxWidth={poemData.lineCount > 20 ? "lg" : "sm"}>
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
				{poemData.lineCount > 20 && <PoemColumns poemData={poemData} />}
				{poemData.lineCount <= 20 && <Poem poemData={poemData} />}

				{/* <Poem poemData={poemData} /> */}
				{poemData.tags && poemData.tags.length > 0 && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "start",
							width: "100%",
						}}
					>
						<Box
							sx={{
								textAlign: "left",
								padding: "20px",
							}}
						>
							<Typography variant="subtitle1">Tags:</Typography>
							<Box
								sx={{
									marginTop: "5px",
									display: "flex",
									flexWrap: "wrap",
									gap: "5px",
								}}
							>
								{poemData.tags.map((tag) => (
									<Chip key={tag} label={tag} color="warning" />
								))}
							</Box>
						</Box>
					</Box>
				)}

				{user && (
					<Box
						sx={{
							marginTop: "20px",
							display: "flex",
							justifyContent: "center",
							gap: "5em",
						}}
					>
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
		<Container maxWidth="md" sx={{ padding: "20px" }}>
			<Typography>No poem found</Typography>
		</Container>
	);
};

export default PoemPage;
