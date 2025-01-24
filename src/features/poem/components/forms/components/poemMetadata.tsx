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
} from "@mui/material";
import { SoftTextField } from "@/features/shared/components/CustomComponents/CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";

interface PoemMetadataProps {
	tags: string[];
	currentTag: string;
	handleTagRemove: (tag: string) => void;
	handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	comment: string;
	setComment: (comment: string) => void;
	isPublic: boolean;
	setIsPublic: (isPublic: boolean) => void;
	isOriginal: boolean;
	setIsOriginal: (isOriginal: boolean) => void;
	handleSave: (
		e: React.MouseEvent<HTMLButtonElement>,
		publish: boolean
	) => void;
}

const PoemMetadata = ({
	tags,
	currentTag,
	handleTagChange,
	handleTagKeyDown,
	handleTagRemove,
	comment,
	setComment,
	isPublic,
	setIsPublic,
	isOriginal,
	setIsOriginal,
	handleSave,
}: PoemMetadataProps) => {
	const EditFormStyles = {
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
	};

	return (
		<Grid size={{ xs: 12, md: 6 }} sx={EditFormStyles.formGridSecondColumn}>
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
					<Typography variant="subtitle1" sx={EditFormStyles.commentHelperText}>
						What did this make you think/feel? What memory do you associate with
						this?
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
	);
};

export default PoemMetadata;
