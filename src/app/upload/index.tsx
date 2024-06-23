// import { Sheet } from "@mui/joy";
// import TextEditor from "../_components/TextEditor/TextEditor"
// import { EditorProvider } from "../_contexts/Editor.context";

// function Upload() {
//   return (
//     <EditorProvider>
//       <Sheet color="danger" variant="solid">
//         <TextEditor />
//       </Sheet>
//     </EditorProvider>
//   );
// }

// export default Upload;

// src/app/upload/page.tsx
import { Sheet } from "@mui/joy";

function Upload() {
  console.log("Upload page rendered");
  return <Sheet color="danger">Upload Page</Sheet>;
}

export default Upload;

// This forces the page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {}, // props will be passed to the page component
  };
}
