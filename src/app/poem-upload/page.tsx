import { Sheet } from "@mui/joy";
import PoemForm from "../_components/Poem-Form/PoemForm";
import { EditorProvider } from "../_contexts/Editor.context";

function Upload() {
  return (
    <EditorProvider>
      <Sheet color="danger" variant="solid">
        <PoemForm />
      </Sheet>
    </EditorProvider>
  );
}

export default Upload;
