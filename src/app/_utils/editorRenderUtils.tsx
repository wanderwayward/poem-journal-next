import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Typography } from "@mui/joy";
import EditorStanza from "../_components/TextEditor/subcomponents/EditorStanza/EditorStanza";
import EditorLine from "../_components/TextEditor/subcomponents/EditorLine/EditorLine";
import EditorParagraph from "../_components/TextEditor/subcomponents/EditorParagraph/EditorParagraph";

export const DefaultElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'stanza':
      return <EditorStanza {...props} />;
    case 'line':
      return <EditorLine {...props} />;
    case 'paragraph':
      return <EditorParagraph {...props} />;
    default:
      return <EditorStanza {...props} />; // Default to stanza if type is unknown
  }
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  return (
    <Typography
      {...attributes}
      sx={{
        fontWeight: leaf.bold ? "bold" : "normal",
        fontStyle: leaf.italic ? "italic" : "normal",
        textDecoration: leaf.underline ? "underline" : "none",
        display: 'inline', // Display inline to avoid line breaks
      }}
      component="span" // Ensure inline display
    >
      {children}
    </Typography>
  );
};
