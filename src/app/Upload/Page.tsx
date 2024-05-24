import { Sheet } from "@mui/joy";
import TextEditor from "../_components/TextEditor/TextEditor.Component";
import { EditorProvider } from "../_contexts/Editor.Context";

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
