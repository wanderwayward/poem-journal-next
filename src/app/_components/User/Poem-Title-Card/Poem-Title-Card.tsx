import * as React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/joy";
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
      variant="soft"
      color="success"
      sx={{
        width: "15em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: ".2em",
        paddingY: ".5em",
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
          <Link href={`/poem/${poem._id}`}>
            <Typography level="title-lg" sx={{ textAlign: "center" }}>
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
          }}
        >
          <Typography level="body-xs" sx={{ textAlign: "center" }}>
            {poem.author === "Original"
              ? poem.username
              : poem.author || "Unknown"}
          </Typography>
          <Typography level="body-xs" sx={{ textAlign: "center" }}>
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
