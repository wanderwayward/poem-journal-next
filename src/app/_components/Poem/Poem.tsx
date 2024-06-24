// Poem.tsx
import React from "react";
import { Container } from "@mui/material";
import Stanza from "./Stanza/Stanza";
import { PoemStanzaType } from "@/app/_types/Types";

interface PoemProps {
  stanzas: PoemStanzaType[];
}

const Poem: React.FC<PoemProps> = ({ stanzas }) => {
  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      {stanzas.map((stanza) => (
        <Stanza key={stanza.id} children={stanza.children} />
      ))}
    </Container>
  );
};

export default Poem;
