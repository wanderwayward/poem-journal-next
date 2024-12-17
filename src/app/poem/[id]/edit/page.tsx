import ProtectedRoute from "@/app/_components/ProtectedRoute/ProtectedRoute";
import PoemEditForm from "@/features/poem/components/forms/PoemEditForm/PoemEditForm";
import { EditorProvider } from "@/features/editor/contexts/EditorContext";

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
