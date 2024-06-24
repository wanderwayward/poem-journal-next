// Line.tsx
import React from "react";
import { Typography } from "@mui/material";
import { PoemCustomText } from "../../../_types/Types";

interface LineProps {
  text: PoemCustomText["text"]; // Using the 'text' type from CustomText
}

const Line: React.FC<LineProps> = ({ text }) => {
  return (
    <Typography variant="body1" component="div" style={{ marginLeft: "20px" }}>
      {text}
    </Typography>
  );
};

export default Line;
