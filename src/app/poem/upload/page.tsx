import PoemForm from "@/app/_components/Poem/PoemForm/PoemForm";
import { EditorProvider } from "@/app/_contexts/Editor.context";

function Upload() {
  return (
    <EditorProvider>
      <PoemForm />
    </EditorProvider>
  );
}

export default Upload;
