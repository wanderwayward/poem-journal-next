import PoemForm from "@/features/poem/components/forms/PoemForm/PoemForm";
import { EditorProvider } from "@/features/editor/context/EditorContext";

function Upload() {
	return (
		<EditorProvider>
			<PoemForm />
		</EditorProvider>
	);
}

export default Upload;
