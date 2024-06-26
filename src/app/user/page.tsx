"use client";
import { Box, Typography, CircularProgress } from "@mui/joy";
import { FC, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "../_contexts/User.context";
import { PoemType } from "../_types/Types";
import PoemTitleCard from "../_components/User/Poem-Title-Card/Poem-Title-Card";

const UserView: FC = () => {
  const { user } = useUser();
  const router = useRouter();

  const [poems, setPoems] = useState<PoemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoems = async () => {
      if (user && user.id) {
        try {
          setLoading(true);
          const response = await fetch(`/api/poems/user/${user.id}`);
          const result = await response.json();
          if (response.ok) {
            setPoems(result.data);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching poems:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPoems();
  }, [user]);

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

  return (
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
        hi
      </Typography>
      <Typography>This is a list of all your poems:</Typography>
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
      ) : poems.length > 0 ? (
        poems.map((poem) => (
          <Box
            key={poem._id}
            sx={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <PoemTitleCard
              poem={poem}
              handleDelete={() => handleDeleteClick(poem._id)}
              handleEdit={() => handleEditClick(poem._id)}
            />
          </Box>
        ))
      ) : (
        <Typography>No poems found.</Typography>
      )}
    </Box>
  );
};

export default UserView;
