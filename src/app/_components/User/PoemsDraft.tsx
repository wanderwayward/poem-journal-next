"use client";
import { Box, Typography } from "@mui/joy";
import { FC } from "react";
import { PoemType } from "../../_types/Types";
import PoemTitleCard from "./Poem-Title-Card/Poem-Title-Card";

interface PoemsDraftsProps {
  poems: PoemType[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const PoemsDrafts: FC<PoemsDraftsProps> = ({
  poems,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
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
            <PoemTitleCard
              poem={poem}
              handleDelete={() => handleDelete(poem._id)}
              handleEdit={() => handleEdit(poem._id)}
            />
          </Box>
        ))
      ) : (
        <Typography>No drafts found.</Typography>
      )}
    </>
  );
};

export default PoemsDrafts;
