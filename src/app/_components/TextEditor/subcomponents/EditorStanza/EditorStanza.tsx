import { Typography } from "@mui/material";
import { RenderElementProps } from "slate-react";

const EditorStanza = ({
  attributes,
  children,
  element,
}: RenderElementProps) => (
  <Typography
    component="div"
    {...attributes}
    sx={{
      textAlign: element.alignment || "left",
      marginBottom: 1,
      padding: 1,
    }}
  >
    {children}
  </Typography>
);

export default EditorStanza;
