"use client";
import { Box, Typography } from "@mui/joy";
import { FC, useState, useEffect } from "react";
import { useUser } from "../_contexts/User.context";
import { PoemType } from "../_types/Types";
import PoemTitleCard from "../_components/User/Poem-Title-Card/Poem-Title-Card";

const UserView: FC = () => {
  const { user } = useUser();
  const [poems, setPoems] = useState<PoemType[]>([]);

  useEffect(() => {
    const fetchPoems = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`/api/poems/user/${user.id}`);
          const result = await response.json();
          if (response.ok) {
            setPoems(result.data);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error fetching poems:", error);
        }
      }
    };

    fetchPoems();
  }, [user]);

  console.log(poems);

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
      {poems.length > 0 ? (
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
            <PoemTitleCard poem={poem} />
          </Box>
        ))
      ) : (
        <Typography>No poems found.</Typography>
      )}
    </Box>
  );
};

export default UserView;
