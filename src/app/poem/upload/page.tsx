import PoemForm from "@/app/_components/Poem/PoemForm/PoemForm";
import { EditorProvider } from "@/features/editor/contexts/EditorContext";

function Upload() {
	return (
		<EditorProvider>
			<PoemForm />
		</EditorProvider>
	);
}

export default Upload;
