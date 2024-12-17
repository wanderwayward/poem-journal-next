import { Paper } from "@mui/material";
import TextEditor from "../_components/TextEditor/TextEditor";
import { EditorProvider } from "../_contexts/Editor.context";

function Upload() {
  return (
    <EditorProvider>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: "error.main", // Using the theme's error color
          color: "white", // Ensure text is visible on the dark background
        }}
      >
        <TextEditor />
      </Paper>
    </EditorProvider>
  );
}

export default Upload;
