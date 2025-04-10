"use client";
import {
	Box,
	Typography,
	Grid2 as Grid,
	CircularProgress,
} from "@mui/material";
import { FC } from "react";
import PoemTitleCard from "../PoemTitleCard/PoemTitleCard";
import { PoemType } from "@/features/poem/poemTypes";

interface PoemsListProps {
	poems: PoemType[];
	handleEdit: (id: string) => void;
	handleDelete: (id: string) => void;
	listLabel: string;
	loading: boolean;
}

const PoemsList: FC<PoemsListProps> = ({
	poems,
	handleEdit,
	handleDelete,
	listLabel,
	loading,
}) => {
	return (
		<Grid container spacing={2}>
			{loading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100px",
						width: "100%",
					}}
				>
					<CircularProgress />
				</Box>
			) : poems.length > 0 ? (
				poems.map((poem) => (
					<Grid
						key={poem._id}
						size={{
							xs: 12, // 1 card per row on extra-small screens
							sm: 12, // 1 card per row on small screens
							md: 6, // 2 cards per row on medium screens
							lg: 3, // 3 cards per row on large screens
						}}
						sx={{ display: "flex", justifyContent: "center" }}
					>
						<PoemTitleCard
							poem={poem}
							handleDelete={() => handleDelete(poem._id)}
							handleEdit={() => handleEdit(poem._id)}
						/>
					</Grid>
				))
			) : (
				<Typography>No {listLabel.toLowerCase()} found.</Typography>
			)}
		</Grid>
	);
};

export default PoemsList;
