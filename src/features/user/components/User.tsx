"use client";
import { Paper, Box, Divider } from "@mui/material";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserPoems } from "../../poem/context/UserPoemsContext";
import { useUser } from "../context/UserContext";
import PoemsList from "./Poems-List/PoemsList";
import UserTopHub from "./User-Top-Hub/UserTopHub";
import { UserType } from "@/features/user/userTypes";

const UserProfile: FC = () => {
	const { poems, setPoems, loading } = useUserPoems();
	const { user } = useUser();
	const router = useRouter();

	const [showDrafts, setShowDrafts] = useState(
		typeof window !== "undefined" &&
			new URLSearchParams(window.location.search).get("showDrafts") === "true"
	);

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

	const handleToggleDrafts = () => {
		setShowDrafts(!showDrafts);
		const newQuery = new URLSearchParams({
			showDrafts: (!showDrafts).toString(),
		});
		router.push(`/user?${newQuery.toString()}`);
	};

	return (
		<Paper
			sx={{
				width: {
					xs: "100%",
					sm: "97%",
					md: "95%",
					lg: "90%",
					xl: "97%",
					xxl: "100%",
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
				backgroundColor: "neutral.main",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "left",
				height: "calc(60vh - 64px)",
			}}
		>
			<UserTopHub user={user as UserType} />
			<Divider sx={{ width: "100%", my: 2 }} />

			<PoemsList
				showDrafts={showDrafts}
				handleToggleDrafts={handleToggleDrafts}
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
