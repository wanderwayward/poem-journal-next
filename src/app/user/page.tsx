// src/app/page.tsx
import { Box, Typography } from "@mui/joy";
import { FC } from "react";

const User: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        marginTop: "60px", // Adjust margin for navbar height
      }}
    >
      <Typography level="title-lg" marginBottom="16px">
        hi
      </Typography>
    </Box>
  );
};

export default User;
