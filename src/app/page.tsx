// src/app/page.tsx
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Poem from "./_components/Poem/Poem";
import { parsedTestPoem } from "../../parsedTestPoem";

const Home: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        marginTop: "60px", // Adjust margin for navbar height
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        The Facts of Life
      </Typography>
      <Poem stanzas={parsedTestPoem} />
    </Box>
  );
};

export default Home;
