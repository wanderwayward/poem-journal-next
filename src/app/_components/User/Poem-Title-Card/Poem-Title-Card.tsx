import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  useTheme,
  Grid,
  Tooltip,
} from "@mui/material";
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
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "97%",
        },
        height: {
          xs: "auto",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingX: ".1em",
        paddingY: ".2em",
        backgroundColor:
          theme.palette.mode === "light" ? "secondary.main" : "error.dark",
      }}
    >
      <CardContent sx={{ width: "100%", padding: "0 !important" }}>
        <Grid
          container
          alignItems="center"
          sx={{ padding: "0 1em", width: "100%" }}
        >
          <Grid item xs zeroMinWidth>
            <Link href={`/poem/${poem._id}`} passHref>
              <Tooltip
                title={poem.title}
                placement="top-start"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -15],
                        },
                      },
                    ],
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: "left" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "block",
                    cursor: "pointer", // Optional: to indicate the text is hoverable
                  }}
                >
                  {poem.title}
                </Typography>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          sx={{ padding: "0 1em", width: "100%", marginTop: 1 }}
        >
          <Grid item xs>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {poem.author === "Original"
                ? poem.username
                : poem.author || "Unknown"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {poem.status}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
