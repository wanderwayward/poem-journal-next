"use client";
import { Box, Paper, alpha, useTheme } from "@mui/material";
import { FC } from "react";
import Poem from "@/features/poem/components/Poem";
import { useUserPoems } from "@/features/poem/context/UserPoemsContext";

const Home: FC = () => {
	const { poems } = useUserPoems();

	const theme = useTheme();
	const backgroundColor = alpha(theme.palette.primary.main, 0.9);

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
			<Paper
				elevation={3}
				sx={{
					backgroundColor: backgroundColor,
					padding: "20px",
					textAlign: "center",
					maxWidth: "100%",
					margin: "0 auto",
				}}
			>
				<Poem poemData={poems[0]} />
			</Paper>
		</Box>
	);
};

export default Home;
