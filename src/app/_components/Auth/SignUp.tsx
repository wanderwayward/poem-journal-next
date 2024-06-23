// src/app/_components/Auth/SignUp.tsx
import { Button, Typography, Box } from "@mui/joy";
import { signIn } from "next-auth/react";

const SignUp = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography level="h2" component="h1">
        Sign Up
      </Typography>
      <Typography level="h4">Sign up with your Google account</Typography>
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
