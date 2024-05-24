import { Typography } from "@mui/material";
import { RenderElementProps } from "slate-react";

const EditorLine = ({ attributes, children }: RenderElementProps) => (
  <Typography component="span" {...attributes} sx={{ marginBottom: "-1" }}>
    {children}
  </Typography>
);
export default EditorLine;
