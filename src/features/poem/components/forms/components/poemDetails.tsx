import { ChangeEvent } from "react";
import {
	useTheme,
	Box,
	FormControl,
	FormLabel,
	Grid2 as Grid,
} from "@mui/material";
import { SoftTextField } from "@/features/shared/components/CustomComponents/CustomComponents";
import TextEditor from "@/features/editor/components/Editor";

interface PoemDetailsProps {
	title: string;
	setTitle: (title: string) => void;
	author: string;
	setAuthor: (author: string) => void;
}

const PoemDetails = ({
	title,
	setTitle,
	author,
	setAuthor,
}: PoemDetailsProps) => {
	const theme = useTheme();

	const EditFormStyles = {
		formGridFirstColumn: { height: "100%" },
		formGridSecondColumn: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},

		titleAndAuthorFields: { marginBottom: ".6em" },
		authorBox: { display: "flex", justifyContent: "space-between", gap: 2 },
	};

	return (
		<Grid size={{ xs: 12, md: 6 }} sx={EditFormStyles.formGridFirstColumn}>
			<FormControl fullWidth>
				<FormLabel>Title</FormLabel>
				<SoftTextField
					theme={theme}
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
						theme={theme}
						style={EditFormStyles.titleAndAuthorFields}
						placeholder="Author"
						value={author}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setAuthor(e.target.value)
						}
					/>
				</FormControl>
			</Box>

			<TextEditor />
		</Grid>
	);
};

export default PoemDetails;
