// Line.tsx
import React from "react";
import { Typography } from "@mui/joy";
import { PoemCustomText } from "../../../_types/Types";

interface LineProps {
  text: PoemCustomText["text"]; // Using the 'text' type from CustomText
}

const Line: React.FC<LineProps> = ({ text }) => {
  return (
    <Typography component="div" style={{ marginLeft: "20px" }}>
      {text}
    </Typography>
  );
};

export default Line;
