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
	const backgroundColor = alpha(theme.palette.neutral.light, 0.9);

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

	//---------------------------------STYLES---------------------------------//
	const FormStyles = {
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
		formGridFirstColumn: { height: "100%" },
		formGridSecondColumn: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},
		secondColumnFieldsBox: {
			flexGrow: 1,
			display: "flex",
			flexDirection: "column",
			gap: 2,
			justifyContent: "start",
		},
		titleAndAuthorFields: {
			marginBottom: ".6em",
		},
		authorBox: { display: "flex", justifyContent: "space-between", gap: 2 },
		tagBox: { display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 1 },
		addTag: { marginBottom: ".6em" },
		tagTitle: { marginBottom: ".1em" },
		commentTitle: { fontSize: "1.25rem", fontWeight: "bold", mb: 1 },
		commentHelperText: { marginBottom: "1rem" },
		publicBox: { display: "flex", flexDirection: "row", mb: 1, mt: 2 },
		publicText: { fontSize: "1.25rem", fontWeight: "bold" },
		originalWorkBox: { display: "flex", flexDirection: "row", mb: 1, mt: 2 },
		originalWorkText: { fontSize: "1.25rem", fontWeight: "bold" },
		switch: { ml: "auto", position: "relative", top: -3 },
		buttonsContainer: {
			flexwrap: "wrap",
			display: "flex", // Flex container for the buttons
			flexDirection: "row", // Arrange buttons horizontally
			alignItems: "center", // Center buttons vertically
			justifyContent: "center", // Center buttons horizontally
		},
		button: { width: "45%", marginX: 1 },
		noPoem: { padding: "20px" },
	};

	return (
		<Paper sx={FormStyles.paper}>
			<Box component="form" sx={FormStyles.mainBox}>
				<Grid container spacing={5} sx={FormStyles.mainGrid}>
					<Grid size={{ xs: 12, md: 6 }} sx={FormStyles.formGridFirstColumn}>
						<FormControl fullWidth>
							<FormLabel>Title</FormLabel>
							<SoftTextField
								style={FormStyles.titleAndAuthorFields}
								placeholder="Untitled"
								value={title}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setTitle(e.target.value)
								}
							/>
						</FormControl>

						<Box sx={FormStyles.authorBox}>
							<FormControl fullWidth>
								<FormLabel>Author</FormLabel>
								<SoftTextField
									style={FormStyles.titleAndAuthorFields}
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
					<Grid size={{ xs: 12, md: 6 }} sx={FormStyles.formGridSecondColumn}>
						<Box sx={FormStyles.secondColumnFieldsBox}>
							<FormControl fullWidth>
								<FormLabel sx={{ mb: "0.1em" }}>Tags</FormLabel>
								<Box sx={FormStyles.tagBox}>
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
									style={FormStyles.addTag}
									placeholder="Comma separated"
									value={currentTag}
									onChange={handleTagChange}
									onKeyDown={handleTagKeyDown}
								/>
							</FormControl>
							<FormControl fullWidth>
								<FormLabel sx={FormStyles.commentTitle}>
									Comment about the Poem
								</FormLabel>
								<Typography
									variant="subtitle1"
									sx={FormStyles.commentHelperText}
								>
									What did this make you think/feel? What memory do you
									associate with this?
								</Typography>
								<SoftTextField
									placeholder="Share your thoughts or feelings about this poem..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									multiline
									minRows={10}
									fullWidth
								/>
							</FormControl>
							<FormControl sx={FormStyles.publicBox}>
								<FormLabel sx={FormStyles.publicText}>
									Make my poem visible to the community.
								</FormLabel>
								<Switch
									checked={isPublic}
									sx={FormStyles.switch}
									onChange={() => setIsPublic(!isPublic)}
								/>
							</FormControl>
							<FormControl sx={FormStyles.originalWorkBox}>
								<FormLabel sx={FormStyles.originalWorkText}>
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
									sx={FormStyles.switch}
								/>
							</FormControl>
						</Box>
						<Box sx={FormStyles.buttonsContainer}>
							<Button
								onClick={(e) => handleSave(e, false)}
								variant="contained"
								color="primary"
								size="large"
								sx={FormStyles.button}
							>
								Save Draft
							</Button>
							<Button
								onClick={(e) => handleSave(e, true)}
								variant="contained"
								color="primary"
								size="large"
								sx={FormStyles.button}
							>
								Publish
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

export default PoemForm;
