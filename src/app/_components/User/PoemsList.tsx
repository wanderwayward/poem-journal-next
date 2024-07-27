"use client";
import { Box, Typography, Grid } from "@mui/material";
import { FC } from "react";
import { PoemType } from "../../_types/Types";
import PoemTitleCard from "./Poem-Title-Card/Poem-Title-Card";

interface PoemsListProps {
  poems: PoemType[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  listLabel: string;
}

const PoemsList: FC<PoemsListProps> = ({
  poems,
  handleEdit,
  handleDelete,
  listLabel,
}) => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ marginBottom: "16px", color: "success.main" }}
      >
        {listLabel}
      </Typography>
      {poems.length > 0 ? (
        <Grid container spacing={2}>
          {poems.map((poem) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={poem._id}>
              <PoemTitleCard
                poem={poem}
                handleDelete={() => handleDelete(poem._id)}
                handleEdit={() => handleEdit(poem._id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No {listLabel.toLowerCase()} found.</Typography>
      )}
    </Box>
  );
};

export default PoemsList;
