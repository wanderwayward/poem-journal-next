"use client";
import { Box, Button, Typography, CircularProgress } from "@mui/joy";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserPoems } from "../_contexts/UserPoems.context";
import ProtectedRoute from "../_components/ProtectedRoute/ProtectedRoute";
import PoemsPublished from "../_components/User/PoemsPublished";
import PoemsDrafts from "../_components/User/PoemsDraft";

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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "left",
          marginTop: "60px",
        }}
      >
        <Typography level="title-lg" marginBottom="16px">
          {showDrafts ? "Drafts" : "Published Poems"}
        </Typography>
        <Button
          onClick={handleToggleDrafts}
          variant="soft"
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
              height: "100px", // Adjust the height as needed
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {showDrafts ? (
              <PoemsDrafts
                poems={filteredPoems}
                handleEdit={handleEditClick}
                handleDelete={handleDeleteClick}
              />
            ) : (
              <PoemsPublished
                poems={filteredPoems}
                handleEdit={handleEditClick}
                handleDelete={handleDeleteClick}
              />
            )}
          </>
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default UserView;
