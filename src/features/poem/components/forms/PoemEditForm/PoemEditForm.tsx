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
	Paper,
	Grid2 as Grid,
	Typography,
	CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { useEditorContext } from "@/features/editor/context/EditorContext";
import parseContentToStanzas from "@/features/editor/utils/parseContentToStanzas";
import parseStanzasToContent from "@/features/editor/utils/parseStanzasToContent";

import { useUser } from "@/features/user/context/UserContext";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";
import { PoemType } from "@/features/poem/poemTypes"; //user types need to be moved out of the editor folder but that will be later

import PoemDetails from "../components/poemDetails";
import PoemMetadata from "../components/poemMetadata";

const PoemEditForm = () => {
	const theme = useTheme();

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
	const [lineCount, setLineCount] = useState(0);
	const [stanzaCount, setStanzaCount] = useState(0);

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
				poem.tags && setAreTags(true);
				setComment(poem.comment);
				setIsPublic(poem.public);
				setStanzaCount(poem.stanzaCount);
				setLineCount(poem.lineCount);
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
			public: isPublic,
			stanzaCount: parsedContent.length,
			lineCount: parsedContent.reduce(
				(total, stanza) => total + stanza.children.length,
				0
			),
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
			setAreTags(true);
		}
	};

	const handleTagRemove = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
		setAreTags(false);
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

	//---------------------------------STYLES---------------------------------//

	if (loading) {
		return (
			<Box sx={styles.loadingContainer}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={styles.errorContainer}>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return poemData ? (
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
	) : (
		<Box sx={styles.noPoem}>
			<Typography>No poem found</Typography>
		</Box>
	);
};

export default PoemEditForm;
