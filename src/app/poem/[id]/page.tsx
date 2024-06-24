"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Poem from "@/app/_components/Poem/Poem";
import { PoemType } from "@/app/_types/Types";
import { Container, CircularProgress, Button, Box, Typography } from "@mui/joy";

const PoemPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [poemData, setPoemData] = useState<PoemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPoem();
    }
  }, [id]);

  const fetchPoem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/poems/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        setPoemData(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to fetch poem");
    } finally {
      setLoading(false);
    }
  };

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
        <Typography color="danger">{error}</Typography>
      </Container>
    );
  }

  return poemData ? (
    <Container maxWidth="md" sx={{ padding: "20px", textAlign: "center" }}>
      <Typography level="h4">{poemData.title}</Typography>
      <Poem stanzas={poemData.stanzas} />
      <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button
          variant="plain"
          color="primary"
          onClick={() => alert("Edit functionality coming soon!")}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="danger"
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
