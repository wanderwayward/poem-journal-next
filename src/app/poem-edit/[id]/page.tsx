import PoemEditForm from "../../_components/PoemEditForm/PoemEditForm";
import { EditorProvider } from "../../_contexts/Editor.context";
import ProtectedRoute from "@/app/_components/ProtectedRoute/ProtectedRoute";

function Edit() {
  return (
    <ProtectedRoute>
      <EditorProvider>
        <PoemEditForm />
      </EditorProvider>
    </ProtectedRoute>
  );
}

export default Edit;
