// src/components/TreeAnimation.tsx
"use client";
import { FC, useEffect, useRef } from "react";

import { Box, useTheme, useMediaQuery } from "@mui/material";

import hasPlayed from "../animations/hasPlayed";
import hasNotPlayed from "../animations/hasNotPlayed";

declare interface TreeAnimationProps {
	season: string;
}

const TreeAnimation: FC<TreeAnimationProps> = ({ season }) => {
	// temporary Hard-coded hasPlayed flag
	const hasPlayedFlag = true;
	const svgContainerRef = useRef<HTMLDivElement>(null);

	// Use Material UI's built-in media query hook to check for mobile
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed

	useEffect(() => {
		console.log("starting useEffect");

		const svgPath = isMobile ? "/Vertical_Tree.svg" : "/Horizontal_Tree.svg";

		// Fetch the SVG file
		if (svgContainerRef.current) {
			fetch(svgPath)
				.then((response) => response.text())
				.then((svgContent) => {
					console.log("svg has been fetched");
					// Set the SVG content
					if (svgContainerRef.current) {
						svgContainerRef.current.innerHTML = svgContent;

						console.log("about to check hasPlayed", hasPlayedFlag);

						if (hasPlayedFlag) {
							console.log("inside hasPlayed");
							hasPlayed({ season, svgContainerRef });
							return; // Ensure no further processing happens when hasPlayed is true
						}

						// If hasPlayed is false
						hasNotPlayed({
							season,
							svgContainerRef,
							isMobile,
						});
					}
				})
				.catch((error) => {
					console.error("Error fetching SVG:", error);
				});
		}
	}, [season, isMobile]);

	return (
		<Box
			ref={svgContainerRef}
			sx={{
				zIndex: -2,
				position: "absolute",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",

				"& svg": {
					position: "absolute",
					height: "100%", // SVG height fills the viewport
					width: "auto", // Width adjusts naturally to maintain aspect ratio
					left: "50%", // Center horizontally
					transform: "translateX(-50%)", // Center horizontally for all screens
				},

				// Adjust zoom for narrower split screens or devices
				"@media (max-width: 900px)": {
					"& svg": {
						width: "150%", // Zoom in horizontally on split screens
					},
				},
				"@media (max-width: 800px)": {
					"& svg": {
						width: "250%", // Further zoom in for very narrow views
					},
				},
			}}
		/>
	);
};

export default TreeAnimation;
