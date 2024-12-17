// src/app/_components/Auth/SignUp.tsx
import { Button, Typography, Box } from "@mui/material";
import { signIn } from "next-auth/react";

const SignUp = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" component="h1">
        Sign Up
      </Typography>
      <Typography variant="h6">Sign up with your Google account</Typography>
      <Button
        variant="outlined"
        onClick={() => signIn("google")}
        sx={{ marginTop: 2 }}
      >
        Sign up with Google
      </Button>
    </Box>
  );
};

export default SignUp;
