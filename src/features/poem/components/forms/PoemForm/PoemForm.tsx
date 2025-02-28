"use client";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid2 as Grid, Paper } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import { useEditorContext } from "@/features/editor/context/EditorContext";
import parseContentToStanzas from "@/features/editor/utils/parseContentToStanzas";
import { useUser } from "@/features/user/context/UserContext";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";

import PoemDetails from "../components/poemDetails";
import PoemMetadata from "../components/poemMetadata";

const PoemForm = () => {
	const theme = useTheme();

	const { content } = useEditorContext();
	const router = useRouter();

	const { user } = useUser();
	const initialAuthor = user?.name || "Original";
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState(initialAuthor);
	const [areTags, setAreTags] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [currentTag, setCurrentTag] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [comment, setComment] = useState("");
	const { updatePoems } = useUserPoems();

	const handleSave = async (event: FormEvent, publish: boolean) => {
		event.preventDefault();

		const parsedContent = parseContentToStanzas(content);

		const poem = {
			title: title.trim() || "Untitled",
			author: author.trim() || "Original",
			tags: tags.filter((tag) => tag.trim() !== ""),
			stanzas: parsedContent,
			status: publish ? "Published" : "Draft",
			userId: user?.id,
			username: user?.name,
			comment,
			public: isPublic,
			stanzaCount: parsedContent.length,
			lineCount: parsedContent.reduce(
				(total, stanza) => total + stanza.children.length,
				0
			),
		};

		console.log("Saving poem:", poem);

		try {
			const response = await fetch("/api/mongodb", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(poem),
			});

			console.log("Response status:", response.status);
			const result = await response.json();
			console.log("Poem saved successfully:", result.data);

			updatePoems();

			if (result.data.id) {
				const redirectUrl = publish
					? `/poem/${result.data.id}`
					: "/user?showDrafts=true";
				router.push(redirectUrl);
			}
		} catch (error) {
			console.error("Error saving poem:", error);
		}
	};

	const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentTag(e.target.value);
	};

	const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if ((e.key === "Enter" || e.key === ",") && currentTag.trim() !== "") {
			e.preventDefault();
			if (currentTag.trim() !== "") {
				setTags([...tags, currentTag.trim()]);
				setCurrentTag("");
				setAreTags(true);
			}
		}
	};

	const handleTagRemove = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
		if (tags.length === 1 && tagToRemove === tags[0]) {
			setAreTags(false);
		}
	};

	//---------------------------------STYLES---------------------------------//
	const styles = {
		paper: {
			height: { xs: "auto", md: "820px" },
			padding: "16px",
			bgcolor: alpha(theme.palette.background.paper, 0.95),
		},
		mainBox: { flex: 1, height: "100%" },
		mainGrid: { height: "100%", alignItems: "stretch" },
		loadingContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh",
		},
		errorContainer: { padding: "20px" },
		noPoem: { padding: "20px" },
	};

	return (
		<Paper sx={styles.paper}>
			<Box component="form" sx={styles.mainBox}>
				<Grid container spacing={5} sx={styles.mainGrid}>
					{/* first column */}
					<PoemDetails
						title={title}
						setTitle={setTitle}
						author={author}
						setAuthor={setAuthor}
					/>

					{/* second column */}
					<PoemMetadata
						tags={tags}
						areTags={areTags}
						currentTag={currentTag}
						handleTagChange={handleTagChange}
						handleTagKeyDown={handleTagKeyDown}
						handleTagRemove={handleTagRemove}
						comment={comment}
						setComment={setComment}
						isPublic={isPublic}
						setIsPublic={setIsPublic}
						handleSave={handleSave}
					/>
				</Grid>
			</Box>
		</Paper>
	);
};

export default PoemForm;
