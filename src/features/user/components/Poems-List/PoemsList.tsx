"use client";
import {
	Box,
	Typography,
	Grid2 as Grid,
	CircularProgress,
	Divider,
} from "@mui/material";
import { FC } from "react";
import PoemTitleCard from "../Poem-Title-Card/Poem-Title-Card";
import { PoemType } from "@/features/poem/poemTypes"; //the poem types need to be moved out of the editor folder but that will be later

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
		<Grid container>
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
				<Grid container spacing={2}>
					{poems.map((poem) => (
						<Grid size={{ xs: 12, sm: 6, lg: 3 }} key={poem._id}>
							<PoemTitleCard
								poem={poem}
								handleDelete={() => handleDelete(poem._id)}
								handleEdit={() => handleEdit(poem._id)}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography>No {listLabel.toLowerCase()} found.</Typography>
			)}
		</Grid>
	);
};

export default PoemsList;
