import { Sheet } from "@mui/joy";
import TextEditor from "../_components/TextEditor/TextEditor"
import { EditorProvider } from "../_contexts/Editor.context";

function Upload() {
  return (
    <EditorProvider>
      <Sheet color="danger" variant="solid">
        <TextEditor />
      </Sheet>
    </EditorProvider>
  );
}

export default Upload;
