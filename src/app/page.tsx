"use client";
import { Box, Paper, alpha, useTheme } from "@mui/material";
import { FC } from "react";
import Poem from "@/features/poem/components/Poem";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";

const Home: FC = () => {
	const { poems } = useUserPoems();

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
			<Poem poemData={poems[0]} />
		</Box>
	);
};

export default Home;
