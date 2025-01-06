"use client";
import { Box } from "@mui/material";
import TreeAnimation from "@/features/tree-animation/components/TreeAnimation";
import { useSeason } from "@/features/tree-animation/contexts/SeasonContext";

export default function Animation() {
	const { season, bgColor } = useSeason();
	return <TreeAnimation season={"Spring"} />;
}
