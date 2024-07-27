import * as React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import { PoemType } from "../../../_types/Types";

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
          sm: "97%",
        },
        height: {
          xs: "auto",
          sm: "8em",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: ".1em",
        paddingY: ".2em",
        backgroundColor: "success.main",
      }}
    >
      <CardContent sx={{ width: "100%", padding: "0 !important" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            width: "100%",
            alignItems: "center",
            padding: "0 1em",
          }}
        >
          <Link href={`/poem/${poem._id}`} passHref>
            <Typography variant="h6" sx={{ textAlign: { xs: "left" } }}>
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
            padding: "0 1em",
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            {poem.author === "Original"
              ? poem.username
              : poem.author || "Unknown"}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left" }}>
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
