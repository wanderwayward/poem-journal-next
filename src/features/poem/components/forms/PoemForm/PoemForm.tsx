"use client";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Grid2 as Grid,
	Paper,
	Typography,
	Chip,
	Tooltip,
	Switch,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { SoftTextField } from "../../../../shared/components/CustomComponents/CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "@/features/editor/components/Editor";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import parseContentToStanzas from "@/features/editor/utils/parseContentToStanzas";
import { useUser } from "@/features/user/context/UserContext";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";

const PoemForm = () => {
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.warning.main, 0.2);

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
	const [isOriginal, setIsOriginal] = useState(false);
	const [comment, setComment] = useState("");
	const { updatePoems } = useUserPoems();

	const handleSave = async (event: FormEvent, publish: boolean) => {
		event.preventDefault(); // Prevent default form submission

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
			type: isOriginal ? "Original" : "Non-original",
			public: isPublic,
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

	return (
		<Paper sx={{ width: "100%", p: 2, backgroundColor: backgroundColor }}>
			<Box component="form">
				<Grid container spacing={5}>
					<Grid
						size={{ xs: 12, md: 6 }}
						sx={{ minHeight: "500px", maxHeight: "600px", overflowY: "hidden" }}
					>
						<FormControl fullWidth>
							<FormLabel>Title</FormLabel>
							<SoftTextField
								style={{ marginBottom: ".6em" }}
								placeholder="Untitled"
								value={title}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setTitle(e.target.value)
								}
							/>
						</FormControl>

						<Box
							sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
						>
							<FormControl fullWidth>
								<FormLabel>Author</FormLabel>
								<SoftTextField
									style={{ marginBottom: ".6em" }}
									placeholder={user?.name || "Original"}
									value={author}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setAuthor(e.target.value)
									}
								/>
							</FormControl>
						</Box>

						<TextEditor areTags={areTags} />
					</Grid>

					{/* second column */}
					<Grid
						size={{ xs: 12, md: 6 }}
						sx={{
							padding: "1rem",
						}}
					>
						<FormControl fullWidth>
							<FormLabel sx={{ mb: "0.1em" }}>Tags</FormLabel>
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
								{tags.map((tag, index) => (
									<Chip
										color="error"
										key={index}
										label={tag}
										onDelete={() => handleTagRemove(tag)}
										deleteIcon={<DeleteIcon />}
									/>
								))}
							</Box>
							<SoftTextField
								style={{ marginBottom: ".6em" }}
								placeholder="Comma separated"
								value={currentTag}
								onChange={handleTagChange}
								onKeyDown={handleTagKeyDown}
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormLabel
								sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: 1 }}
							>
								Comment about the Poem
							</FormLabel>
							<Typography variant="subtitle1" sx={{ marginBottom: "1rem" }}>
								What did this make you think/feel? What memory do you associate
								with this?
							</Typography>
							<SoftTextField
								placeholder="Share your thoughts or feelings about this poem..."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								multiline
								minRows={4}
								fullWidth
							/>
						</FormControl>
						<FormControl
							sx={{ display: "flex", flexDirection: "row", mb: 1, mt: 2 }}
						>
							<FormLabel sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
								Make my poem visible to the community.
							</FormLabel>
							<Switch
								checked={isPublic}
								sx={{ ml: "auto", position: "relative", top: -3 }}
								onChange={() => setIsPublic(!isPublic)}
							/>
						</FormControl>
						<FormControl
							sx={{ display: "flex", flexDirection: "row", mb: 1, mt: 2 }}
						>
							<FormLabel
								sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: 1 }}
							>
								My poem is an
								<Tooltip
									title="Original poems are marked with a star on your profile."
									disableInteractive
								>
									<Button>original work.</Button>
								</Tooltip>
							</FormLabel>
							<Switch
								checked={isOriginal}
								onChange={() => setIsOriginal(!isOriginal)}
								sx={{ ml: "auto", position: "relative", top: -3 }}
							/>
						</FormControl>
					</Grid>
				</Grid>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						mt: 2,
					}}
				>
					<Button
						onClick={(e) => handleSave(e, false)}
						variant="contained"
						color="primary"
						size="large"
					>
						Save Draft
					</Button>
					<Button
						onClick={(e) => handleSave(e, true)}
						variant="contained"
						color="primary"
						size="large"
						sx={{ ml: 2 }}
					>
						Publish
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default PoemForm;
