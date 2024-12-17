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
import { PoemType } from "@/editor/types/editorTypes"; //the poem types need to be moved out of the editor folder but that will be later

interface PoemsListProps {
	poems: PoemType[];
	handleEdit: (id: string) => void;
	handleDelete: (id: string) => void;
	handleToggleDrafts: () => void;
	showDrafts: boolean;
	listLabel: string;
	loading: boolean;
}

const PoemsList: FC<PoemsListProps> = ({
	poems,
	handleEdit,
	handleDelete,
	listLabel,
	loading,
	handleToggleDrafts,
	showDrafts,
}) => {
	return (
		<Grid container>
			<Grid size={12} sx={{ display: "flex" }} mb={2}>
				<Typography
					onClick={handleToggleDrafts}
					variant="h4"
					sx={{
						color: !showDrafts ? "secondary.dark" : "text.disabled",
						textAlign: {
							xs: "center",
							sm: "left",
						},
						"&:hover": {
							cursor: "pointer",
							color: "error.main",
							transition: "color 0.3s",
						},
					}}
				>
					Published
				</Typography>
				<Divider
					variant="middle"
					orientation="vertical"
					sx={{ mx: 1 }}
					flexItem
				/>
				<Typography
					onClick={handleToggleDrafts}
					variant="h4"
					sx={{
						color: showDrafts ? "secondary.dark" : "text.disabled",
						textAlign: {
							xs: "center",
							sm: "left",
						},
						"&:hover": {
							cursor: "pointer",
							color: "error.main",
							transition: "color 0.3s",
						},
					}}
				>
					Drafts
				</Typography>
			</Grid>

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
						<Grid size={{ xs: "12", sm: "6", lg: "4" }} key={poem._id}>
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
