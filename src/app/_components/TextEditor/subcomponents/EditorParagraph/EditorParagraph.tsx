import { Typography } from "@mui/joy";
import { RenderElementProps } from "slate-react";

const EditorParagraph = ({ attributes, children }: RenderElementProps) => (
  <Typography {...attributes}>{children}</Typography>
);

export default EditorParagraph;
