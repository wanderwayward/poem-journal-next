// src/app/_components/Auth/SignIn.tsx
import { Button, Typography, Box } from "@mui/joy";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography level="h2" component="h1">
        Sign In
      </Typography>
      <Typography level="h4">Sign in with your Google account</Typography>
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
