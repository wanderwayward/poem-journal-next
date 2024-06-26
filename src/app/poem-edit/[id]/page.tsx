import PoemEditForm from "../../_components/PoemEditForm/PoemEditForm";
import { EditorProvider } from "../../_contexts/Editor.context";

function Edit() {
  return (
    <EditorProvider>
      <PoemEditForm />
    </EditorProvider>
  );
}

export default Edit;
