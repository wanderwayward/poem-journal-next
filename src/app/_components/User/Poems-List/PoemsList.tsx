"use client";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { FC } from "react";
import { PoemType } from "../../../_types/Types";
import PoemTitleCard from "../Poem-Title-Card/Poem-Title-Card";

interface PoemsListProps {
  poems: PoemType[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  listLabel: string;
  loading: boolean;
}

const PoemsList: FC<PoemsListProps> = ({
  poems,
  handleEdit,
  handleDelete,
  listLabel,
  loading,
}) => {
  if (loading) {
    return (
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
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          marginBottom: "16px",
          color: "secondary.dark",
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
        {listLabel}
      </Typography>
      {poems.length > 0 ? (
        <Grid container spacing={2}>
          {poems.map((poem) => (
            <Grid item xs={12} sm={6} lg={4} key={poem._id}>
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
