// src/app/_components/Auth/SignIn.tsx
import { Button, Typography, Box } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" component="h1">
        Sign In
      </Typography>
      <Typography variant="h6">Sign in with your Google account</Typography>
      <Button
        variant="outlined"
        onClick={() => signIn("google")}
        sx={{ marginTop: 2 }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignIn;
