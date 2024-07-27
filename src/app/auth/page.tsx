"use client";

import { useState } from "react";
import { Button, Box } from "@mui/material";
import SignIn from "@/app/_components/Auth/SignIn";
import SignUp from "@/app/_components/Auth/SignUp";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {isSignUp ? <SignUp /> : <SignIn />}
      <Button
        variant="outlined"
        onClick={() => setIsSignUp(!isSignUp)}
        sx={{ marginTop: 2 }}
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  );
};

export default Auth;
