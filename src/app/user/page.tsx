"use client";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserPoems } from "../_contexts/UserPoems.context";
import ProtectedRoute from "../_components/ProtectedRoute/ProtectedRoute";
import PoemsList from "../_components/User/PoemsList";

const UserView: FC = () => {
  const { poems, setPoems, loading } = useUserPoems();
  const router = useRouter();

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const showDraftsParam = searchParams.get("showDrafts");
  const [showDrafts, setShowDrafts] = useState(showDraftsParam === "true");

  const handleEditClick = (id: string) => {
    router.push(`/poem-edit/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await fetch(`/api/poems/${id}`, {
        method: "DELETE",
      });
      setPoems((prevPoems) => prevPoems.filter((poem) => poem._id !== id));
    } catch (error) {
      console.error("Failed to delete poem:", error);
    }
  };

  const filteredPoems = poems.filter(
    (poem) => poem.status === (showDrafts ? "Draft" : "Published")
  );

  const handleToggleDrafts = () => {
    setShowDrafts(!showDrafts);
    const newQuery = new URLSearchParams({
      showDrafts: !showDrafts ? "true" : "false",
    });
    router.push(`/user?${newQuery.toString()}`);
  };

  return (
    <ProtectedRoute>
      <Paper
        sx={{
          width: {
            xs: "100%",
            sm: "75%",
            md: "80%",
            lg: "50%",
          },
          borderRadius: ".1em",
          padding: ".8em",
          margin: { xs: ".5em", sm: "auto" },
          backgroundColor: "neutral.main", // Adjust as needed for theme
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <Button
            onClick={handleToggleDrafts}
            variant="contained"
            sx={{ marginBottom: "16px" }}
          >
            {showDrafts ? "Show Published" : "Show Drafts"}
          </Button>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <PoemsList
              poems={filteredPoems}
              handleEdit={handleEditClick}
              handleDelete={handleDeleteClick}
              listLabel={showDrafts ? "Drafts" : "Published Poems"}
            />
          )}
        </Box>
      </Paper>
    </ProtectedRoute>
  );
};

export default UserView;
