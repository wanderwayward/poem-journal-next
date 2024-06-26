import { Sheet } from "@mui/joy";
import PoemForm from "../_components/PoemForm/PoemForm";
import { EditorProvider } from "../_contexts/Editor.context";

function Upload() {
  return (
    <EditorProvider>
      <PoemForm />
    </EditorProvider>
  );
}

export default Upload;
