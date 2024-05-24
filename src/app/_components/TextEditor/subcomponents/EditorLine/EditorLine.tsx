import { Typography } from "@mui/material";
import { RenderElementProps } from "slate-react";

const EditorLine = ({ attributes, children, element }: RenderElementProps) => (
  <Typography
    component="div"
    {...attributes}
    sx={{ textAlign: element.alignment || "left", marginBottom: "-1" }}
  >
    {children}
  </Typography>
);

export default EditorLine;
