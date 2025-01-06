"use client";
import { Box } from "@mui/material";
import TreeAnimation from "@/features/tree-animation/components/TreeAnimation";
import { useSeason } from "@/features/tree-animation/contexts/SeasonContext";

export default function Animation() {
	const { season, bgColor } = useSeason();
	return (
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
			<TreeAnimation season={"Winter"} />
		</Box>
	);
}
