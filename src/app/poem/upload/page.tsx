import PoemForm from "@/features/poem/components/forms/PoemForm/PoemForm";
import { EditorProvider } from "@/features/editor/contexts/EditorContext";

function Upload() {
	return (
		<EditorProvider>
			<PoemForm />
		</EditorProvider>
	);
}

export default Upload;
