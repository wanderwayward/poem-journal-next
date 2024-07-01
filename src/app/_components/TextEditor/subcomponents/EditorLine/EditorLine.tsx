import { Typography } from "@mui/joy";
import { RenderElementProps } from "slate-react";

const EditorLine = ({ attributes, children, element }: RenderElementProps) => (
  <Typography
    component="div"
    {...attributes}
    sx={{
      textAlign: element.alignment || "left",
      marginBottom: 0.1,
      display: "block",
    }}
  >
    {children}
  </Typography>
);

export default EditorLine;
