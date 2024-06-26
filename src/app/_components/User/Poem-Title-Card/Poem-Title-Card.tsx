import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { Edit, Delete } from "@mui/icons-material";
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
      variant="soft"
      sx={{
        width: "15em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: ".5em",
        paddingY: "none",
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
          <Typography level="title-md" sx={{ textAlign: "center" }}>
            {poem.title}
          </Typography>
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
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
            {poem.author === "Original"
              ? poem.username
              : poem.author || "Unknown"}
          </Typography>
          <Typography level="body-sm" sx={{ textAlign: "center" }}>
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
