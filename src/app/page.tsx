// src/app/page.tsx
import { Box, Typography } from "@mui/joy";
import { FC } from "react";
import Poem from "./_components/Poem/Poem";
import { parsedTestPoem } from "../../parsedTestPoem";

const Home: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 60px)", // Full viewport height minus 60px for the navbar
        display: "flex", // Establishes a flex container for flexible box layout
        flexDirection: "column", // Ensures the boxes are stacked vertically
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
        textAlign: "left",
        paddingTop: "16px", // Adjust to push content up slightly
      }}
    >
      <Typography level="title-lg" marginBottom="16px">
        The Facts of Life
      </Typography>
      <Poem stanzas={parsedTestPoem} />
    </Box>
  );
};

export default Home;
