"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false);

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			{isSignUp ? <SignUp /> : <SignIn />}
			<button
				onClick={() => setIsSignUp(!isSignUp)}
				style={{
					marginTop: "16px",
					padding: "8px 16px",
					border: "1px solid #ccc",
					borderRadius: "4px",
				}}
			>
				{isSignUp
					? "Already have an account? Sign In"
					: "Don't have an account? Sign Up"}
			</button>
		</Box>
	);
};

export default Auth;
