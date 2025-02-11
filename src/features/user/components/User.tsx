"use client";
import { Paper, Grid2 as Grid, Divider, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserPoems } from "../../poem/context/UserPoemsContext";
import { useUser } from "../context/UserContext";
import PoemsList from "./Poems-List/PoemsList";
import UserTopHub from "./User-Top-Hub/UserTopHub";
import StatusBar from "./StatusBar/StatusBar";
import { UserType } from "@/features/user/userTypes";
import { useTheme, alpha } from "@mui/material/styles";

const UserProfile: FC = () => {
	const theme = useTheme();
	const { poems, setPoems, loading } = useUserPoems();
	const { user } = useUser();
	const router = useRouter();

	const [showDrafts, setShowDrafts] = useState(false);

	const handleEditClick = (id: string) => {
		router.push(`/poem/${id}/edit`);
	};

	const handleDeleteClick = async (id: string) => {
		try {
			await fetch(`/api/poems/${id}`, {
				method: "DELETE",
			});
			setPoems((prevPoems) => prevPoems.filter((poem) => poem._id !== id));
		} catch (error) {
			console.error("Failed to delete poem:", error);
		}
	};

	const filteredPoems = poems.filter(
		(poem) => poem.status === (showDrafts ? "Draft" : "Published")
	);

	const handleToggleDrafts = async () => {
		// const newPreference = !showDrafts ? "Drafts" : "Published";
		setShowDrafts(!showDrafts);

		// try {
		//   await fetch('/api/user/updatePreference', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ preferredView: newPreference }),
		//   });
		// } catch (error) {
		//   console.error("Failed to update preference:", error);
		// }
	};

	return (
		<Paper
			sx={{
				width: {
					xs: "98%",
					md: "95%",
					lg: "80%",
					xxl: "50%",
				},
				borderRadius: ".1em",
				padding: {
					xs: ".5em",
					sm: ".8em",
					md: "1em",
					lg: "1.2em",
					xl: "1.5em",
					xxl: "2em",
					xxxl: "2.5em",
				},
				margin: { xs: ".5em", sm: "auto" },
				backgroundColor: alpha(theme.palette.background.paper, 0.95),
				backgroundImage: `linear-gradient(to bottom, ${alpha(
					theme.palette.background.paper,
					0.15
				)}, ${alpha(theme.palette.secondary.light, 0.15)})`,
				backgroundBlendMode: "overlay",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "left",
				height: "calc(70vh - 64px)",
			}}
		>
			<UserTopHub user={user as UserType} />
			<Divider sx={{ width: "100%", my: 2 }} />
			<StatusBar
				showDrafts={showDrafts}
				handleToggleDrafts={handleToggleDrafts}
			/>

			<PoemsList
				loading={loading}
				poems={filteredPoems}
				handleEdit={handleEditClick}
				handleDelete={handleDeleteClick}
				listLabel={showDrafts ? "Drafts" : "Published Poems"}
			/>
		</Paper>
	);
};

export default UserProfile;
