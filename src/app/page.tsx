"use client";
import { Box, Paper } from "@mui/material";
import { FC } from "react";
import Poem from "./_components/Poem/Poem";
import { useUserPoems } from "./_contexts/UserPoems.context";

const Home: FC = () => {
  const { poems } = useUserPoems();

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
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "primary.light",
          padding: "20px",
          textAlign: "center",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Poem poemData={poems[0]} />
      </Paper>
    </Box>
  );
};

export default Home;
