import React from "react";
import { Box } from "@mui/material";
import Line from "../Line/Line";
import { PoemStanzaType } from "@/app/_types/Types";

interface StanzaProps {
  stanza: PoemStanzaType;
}

const Stanza: React.FC<StanzaProps> = ({ stanza }) => {
  return (
    <Box
      sx={{
        marginBottom: "15px",
      }}
    >
      {stanza.children.map((line) => (
        <Line key={line.id} line={line} />
      ))}
    </Box>
  );
};

export default Stanza;
