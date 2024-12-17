"use client";
import { Box } from "@mui/material";
import Auth from "@/features/auth/Auth";
import SignIn from "@/features/auth/components/SignIn/SignIn";

const AuthPage = () => {
	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Auth />
			<SignIn />
		</Box>
	);
};

export default AuthPage;
