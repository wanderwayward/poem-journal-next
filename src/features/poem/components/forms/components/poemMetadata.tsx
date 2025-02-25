import {
	Box,
	FormControl,
	FormLabel,
	Typography,
	Grid2 as Grid,
	Chip,
	Button,
	Switch,
	Tooltip,
	useTheme,
} from "@mui/material";
import { SoftTextField } from "@/features/shared/components/CustomComponents/CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";

interface PoemMetadataProps {
	tags: string[];
	areTags: boolean;
	currentTag: string;
	handleTagRemove: (tag: string) => void;
	handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	comment: string;
	setComment: (comment: string) => void;
	isPublic: boolean;
	setIsPublic: (isPublic: boolean) => void;
	handleSave: (
		e: React.MouseEvent<HTMLButtonElement>,
		publish: boolean
	) => void;
}

const PoemMetadata = ({
	tags,
	areTags,
	currentTag,
	handleTagChange,
	handleTagKeyDown,
	handleTagRemove,
	comment,
	setComment,
	isPublic,
	setIsPublic,

	handleSave,
}: PoemMetadataProps) => {
	const theme = useTheme();

	// Styles//

	const styles = {
		formGridSecondColumn: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},
		secondColumnFieldsBox: {
			flexGrow: 1,
			display: "flex",
			flexDirection: "column",
			// gap: 2,
			justifyContent: "start",
		},
		tagBox: { display: "flex", flexWrap: "wrap", mb: areTags ? 1 : 0, gap: 1 },
		addTag: { marginBottom: ".6em" },
		tagTitle: {
			marginBottom: areTags ? ".1em" : 0,
			fontWeight: "bold",
			letterSpacing: 1.5,
		},
		commentTitle: {
			fontWeight: "bold",
			letterSpacing: 1.5,
		},
		publicBox: { display: "flex", flexDirection: "row", mt: 2, pl: 1 },
		publicText: { fontSize: "1.25rem", fontWeight: "bold", letterSpacing: 1.5 },
		switch: { ml: "auto", position: "relative", top: -3 },
		buttonsContainer: {
			flexwrap: "wrap",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},
		button: { width: "45%", marginX: 1 },
	};

	// Styles//

	return (
		<Grid size={{ xs: 12, md: 6 }} sx={styles.formGridSecondColumn}>
			<Box sx={styles.secondColumnFieldsBox}>
				<FormControl fullWidth>
					<FormLabel sx={styles.tagTitle}>TAGS</FormLabel>
					<Box sx={styles.tagBox}>
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
						theme={theme}
						style={styles.addTag}
						placeholder="Comma separated"
						value={currentTag}
						onChange={handleTagChange}
						onKeyDown={handleTagKeyDown}
					/>
				</FormControl>
				<FormControl fullWidth>
					<FormLabel sx={styles.commentTitle}>SHARE YOUR THOUGHTS</FormLabel>
					<SoftTextField
						theme={theme}
						placeholder="How did this poem resonate with you?"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						multiline
						minRows={15}
						fullWidth
					/>
				</FormControl>
				<FormControl sx={styles.publicBox}>
					<FormLabel sx={styles.publicText}>VISIBLE TO THE COMMUNITY</FormLabel>
					<Switch
						checked={isPublic}
						sx={styles.switch}
						onChange={() => setIsPublic(!isPublic)}
					/>
				</FormControl>
			</Box>
			<Box sx={styles.buttonsContainer}>
				<Button
					onClick={(e) => handleSave(e, false)}
					variant="contained"
					color="primary"
					size="large"
					sx={styles.button}
				>
					Save Draft
				</Button>
				<Button
					onClick={(e) => handleSave(e, true)}
					variant="contained"
					color="primary"
					size="large"
					sx={styles.button}
				>
					Publish
				</Button>
			</Box>
		</Grid>
	);
};

export default PoemMetadata;
