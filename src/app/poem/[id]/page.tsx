"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Poem from "@/app/_components/Poem/Poem";
import { PoemStanzaType } from "@/app/_types/Types";
import {
  Container,
  CircularProgress,
  Button,
  Box,
  Typography,
} from "@mui/material";

const PoemPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [poemData, setPoemData] = useState<PoemStanzaType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch the poem data based on the ID
      fetch(`/api/poems/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPoemData(data.stanzas);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch the poem");
          setLoading(false);
        });
    } else {
      setError("No poem ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ padding: "20px" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return poemData ? (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Poem stanzas={poemData} />
      {/* Placeholder for future actions */}
      <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Edit functionality coming soon!")}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => alert("Delete functionality coming soon!")}
        >
          Delete
        </Button>
      </Box>
    </Container>
  ) : (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Typography>No poem found</Typography>
    </Container>
  );
};

export default PoemPage;
