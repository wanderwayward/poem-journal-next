import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Typography } from "@mui/joy";
import EditorStanza from "../components/textEditor/subcomponents/EditorStanza/EditorStanza.component";
import EditorLine from "../components/textEditor/subcomponents/EditorLine/EditorLine.component";
import EditorParagraph from "../components/textEditor/subcomponents/EditorParagraph/EditorParagraph.component";

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
        display: 'block'
      }}
    >
      {children}
    </Typography>
  );
};
