"use client";
import {
	useState,
	useEffect,
	ChangeEvent,
	FormEvent,
	KeyboardEvent,
	useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Paper,
	Grid2 as Grid,
	Typography,
	CircularProgress,
	Chip,
	Tooltip,
	Switch,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import TextEditor from "@/features/editor/components/Editor";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import parseContentToStanzas from "@/features/editor/utils/parseContentToStanzas";
import parseStanzasToContent from "@/features/editor/utils/parseStanzasToContent";

import { useUser } from "@/features/user/context/UserContext";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";
import { PoemType } from "@/features/poem/poemTypes"; //user types need to be moved out of the editor folder but that will be later
import { SoftTextField } from "../../../../shared/components/CustomComponents/CustomComponents";
import { display, height } from "@mui/system";
import { Edit } from "@mui/icons-material";

const PoemEditForm = () => {
	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.warning.main, 0.2);

	const { content, setContent } = useEditorContext();
	const router = useRouter();
	const params = useParams();
	const id = params?.id;

	const [poemData, setPoemData] = useState<PoemType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const { user } = useUser();
	const { updatePoems } = useUserPoems();
	const initialAuthor = user?.name || "Original";

	const [areTags, setAreTags] = useState(false);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState(initialAuthor);
	const [tags, setTags] = useState<string[]>([]);
	const [currentTag, setCurrentTag] = useState("");
	const [comment, setComment] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [isOriginal, setIsOriginal] = useState(false);

	const fetchPoem = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/poems/${id}`);
			const result = await response.json();
			if (result.status === "success") {
				const poem = result.data;
				setPoemData(poem);
				setTitle(poem.title);
				setAuthor(poem.author);
				setTags(poem.tags);
				setComment(poem.comment);
				setAreTags(poem.tags.length > 0);
				setIsPublic(poem.public);
				setIsOriginal(poem.type === "original");

				// Convert stanzas to Slate format
				const formattedContent = parseStanzasToContent(poem.stanzas);
				setContent(formattedContent);
			} else {
				setError(result.message);
			}
		} catch (error) {
			setError("Failed to fetch poem");
		} finally {
			setLoading(false);
		}
	}, [id, setContent]);

	useEffect(() => {
		if (id) {
			fetchPoem();
		}
	}, [id, fetchPoem]);

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

		try {
			const response = await fetch(id ? `/api/poems/${id}` : "/api/mongodb", {
				method: id ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(poem),
			});

			const result = await response.json();

			// Update user poems
			updatePoems();

			// Redirect based on status
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
			setTags([...tags, currentTag.trim()]);
			setCurrentTag("");
			setAreTags(true); // Update areTags to true when a new tag is added
		}
	};

	const handleTagRemove = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
		if (tags.length === 1 && tagToRemove === tags[0]) {
			setAreTags(false); // Update areTags to false if all tags are removed
		}
	};

	//---------------------------------STYLES---------------------------------//
	const EditFormStyles = {
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
		titleAndAuthorFields: { marginBottom: ".6em" },
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

	//---------------------------------STYLES---------------------------------//

	if (loading) {
		return (
			<Box sx={EditFormStyles.loadingContainer}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={EditFormStyles.errorContainer}>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return poemData ? (
		<Paper sx={EditFormStyles.paper}>
			<Box component="form" sx={EditFormStyles.mainBox}>
				<Grid container spacing={5} sx={EditFormStyles.mainGrid}>
					<Grid
						size={{ xs: 12, md: 6 }}
						sx={EditFormStyles.formGridFirstColumn}
					>
						<FormControl fullWidth>
							<FormLabel>Title</FormLabel>
							<SoftTextField
								style={EditFormStyles.titleAndAuthorFields}
								placeholder="Untitled"
								value={title}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setTitle(e.target.value)
								}
							/>
						</FormControl>

						<Box sx={EditFormStyles.authorBox}>
							<FormControl fullWidth>
								<FormLabel>Author</FormLabel>
								<SoftTextField
									style={EditFormStyles.titleAndAuthorFields}
									placeholder="Author"
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
						sx={EditFormStyles.formGridSecondColumn}
					>
						<Box sx={EditFormStyles.secondColumnFieldsBox}>
							<FormControl fullWidth>
								<FormLabel sx={EditFormStyles.tagTitle}>Tags</FormLabel>
								<Box sx={EditFormStyles.tagBox}>
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
									style={EditFormStyles.addTag}
									placeholder="Comma separated"
									value={currentTag}
									onChange={handleTagChange}
									onKeyDown={handleTagKeyDown}
								/>
							</FormControl>
							<FormControl fullWidth>
								<FormLabel sx={EditFormStyles.commentTitle}>
									Comment about the Poem
								</FormLabel>
								<Typography
									variant="subtitle1"
									sx={EditFormStyles.commentHelperText}
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
							<FormControl sx={EditFormStyles.publicBox}>
								<FormLabel sx={EditFormStyles.publicText}>
									Make my poem visible to the community.
								</FormLabel>
								<Switch
									checked={isPublic}
									sx={EditFormStyles.switch}
									onChange={() => setIsPublic(!isPublic)}
								/>
							</FormControl>
							<FormControl sx={EditFormStyles.originalWorkBox}>
								<FormLabel sx={EditFormStyles.originalWorkText}>
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
									sx={EditFormStyles.switch}
								/>
							</FormControl>
						</Box>
						<Box sx={EditFormStyles.buttonsContainer}>
							<Button
								onClick={(e) => handleSave(e, false)}
								variant="contained"
								color="primary"
								size="large"
								sx={EditFormStyles.button}
							>
								Save Draft
							</Button>
							<Button
								onClick={(e) => handleSave(e, true)}
								variant="contained"
								color="primary"
								size="large"
								sx={EditFormStyles.button}
							>
								Publish
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	) : (
		<Box sx={EditFormStyles.noPoem}>
			<Typography>No poem found</Typography>
		</Box>
	);
};

export default PoemEditForm;
