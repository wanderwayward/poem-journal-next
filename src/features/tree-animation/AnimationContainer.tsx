"use client";
import { Box } from "@mui/material";
import TreeAnimation from "./components/TreeAnimation";
import { useSeason } from "./contexts/SeasonContext";
import { SeasonProvider } from "./contexts/SeasonContext";

export default function AnimationContainer() {
	const { season, bgColor } = useSeason();
	return (
		<SeasonProvider>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				sx={{
					height: "100vh",
					width: "100%",
					bgcolor: bgColor,
				}}
			>
				<TreeAnimation season={season} />
			</Box>
		</SeasonProvider>
	);
}
