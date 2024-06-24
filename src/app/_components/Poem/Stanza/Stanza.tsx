import React from "react";
import { Box } from "@mui/joy";
import Line from "../Line/Line";
import { PoemLineType } from "@/app/_types/Types";

interface StanzaProps {
  children: PoemLineType[]; // The children will be PoemLineType[]
}

const Stanza: React.FC<StanzaProps> = ({ children }) => {
  return (
    <Box
      sx={{
        marginBottom: "15px",
        paddingLeft: "10px",
      }}
    >
      {children.map((line) => (
        <Line key={line.id} text={line.children[0].text} />
      ))}
    </Box>
  );
};

export default Stanza;
