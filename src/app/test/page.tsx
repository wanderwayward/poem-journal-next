import { Paper } from "@mui/material";
import { EditorProvider } from "@/editor/Editor.context";

function Upload() {
	return (
		<EditorProvider>
			<Paper
				sx={{
					padding: 2,
					backgroundColor: "error.main", // Using the theme's error color
					color: "white", // Ensure text is visible on the dark background
				}}
			></Paper>
		</EditorProvider>
	);
}

export default Upload;
