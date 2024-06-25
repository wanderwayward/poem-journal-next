import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { PoemType } from "../../../_types/Types";

interface PoemTitleCardProps {
  poem: PoemType;
}

export default function PoemTitleCard({ poem }: PoemTitleCardProps) {
  return (
    <Card
      variant="soft"
      sx={{
        width: "15em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Typography level="title-md" sx={{ textAlign: "center" }}>
          {poem.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            mt: 1,
          }}
        >
          <Typography level="body-sm" sx={{ flexGrow: 1, textAlign: "center" }}>
            {poem.author === "Original"
              ? poem.username
              : poem.author || "Unknown"}
          </Typography>
          <Typography level="body-sm" sx={{ flexGrow: 1, textAlign: "center" }}>
            {poem.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
