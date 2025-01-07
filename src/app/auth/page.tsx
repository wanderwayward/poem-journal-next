"use client";

import { Box } from "@mui/material";
import Auth from "@/features/auth/Auth";

const AuthPage = () => {
	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Auth />
		</Box>
	);
};

export default AuthPage;
