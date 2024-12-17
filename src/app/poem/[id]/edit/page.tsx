import ProtectedRoute from "@/app/_components/ProtectedRoute/ProtectedRoute";
import PoemEditForm from "@/app/_components/Poem/PoemEditForm/PoemEditForm";
import { EditorProvider } from "@/app/_contexts/Editor.context";

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
