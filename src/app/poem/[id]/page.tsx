"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Poem from "@/app/_components/Poem/Poem";
import { PoemType } from "@/app/_types/Types";
import {
  Container,
  CircularProgress,
  Button,
  Box,
  Typography,
  Chip,
} from "@mui/joy";
import { useUser } from "@/app/_contexts/User.context";

const PoemPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;
  const { user } = useUser();

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

  const handleEditClick = () => {
    console.log("Edit clicked");
    router.push(`/poem-edit/${id}`);
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    try {
      fetch(`/api/poems/${id}`, {
        method: "DELETE",
      });
      router.push("/user");
    } catch (error) {
      console.error("Failed to delete poem:", error);
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
    <Container
      maxWidth="md"
      sx={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography level="h2">{poemData.title}</Typography>
      <Typography level="body-xs" color="danger">
        {poemData.author} by {poemData.username}
      </Typography>
      <Poem stanzas={poemData.stanzas} />
      {poemData.tags && poemData.tags.length > 0 && (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              textAlign: "left",
              width: "65%",
            }}
          >
            <Typography>Tags:</Typography>
            <Box
              sx={{
                marginTop: "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {poemData.tags.map((tag) => (
                <Chip key={tag} children={tag} />
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {user ? (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "5em",
          }}
        >
          <Button variant="plain" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="outlined" color="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Box>
      ) : null}
    </Container>
  ) : (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Typography>No poem found</Typography>
    </Container>
  );
};

export default PoemPage;
