import * as React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PoemType } from "../../../_types/Types";
import Link from "next/link";

interface PoemTitleCardProps {
  poem: PoemType;
  handleDelete: () => void;
  handleEdit: () => void;
}

export default function PoemTitleCard({
  poem,
  handleDelete,
  handleEdit,
}: PoemTitleCardProps) {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          xl: "15em",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: ".2em",
        paddingY: ".5em",
        backgroundColor: "success.main", // This replaces the `color` prop
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Link href={`/poem/${poem._id}`} passHref>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {poem.title}
            </Typography>
          </Link>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            width: "100%",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {poem.author === "Original"
              ? poem.username
              : poem.author || "Unknown"}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {poem.status}
          </Typography>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
