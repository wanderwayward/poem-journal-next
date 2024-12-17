import ProtectedRoute from "@/features/shared/components/ProtectedRoute/ProtectedRoute";
import PoemEditForm from "@/features/poem/components/forms/PoemEditForm/PoemEditForm";
import { EditorProvider } from "@/features/editor/context/EditorContext";

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
