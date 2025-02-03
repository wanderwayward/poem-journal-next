// src/components/TreeAnimation.tsx
"use client";
import { FC, useEffect, useRef } from "react";

import { Box } from "@mui/material";

import hasPlayed from "../animations/hasPlayed";
import hasNotPlayed from "../animations/hasNotPlayed";

declare interface TreeAnimationProps {
	season: string;
}

const TreeAnimation: FC<TreeAnimationProps> = ({ season }) => {
	// temporary Hard-coded hasPlayed flag
	const hasPlayedFlag = true;
	const svgContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("starting useEffect");
		// Fetch the SVG file
		if (svgContainerRef.current) {
			fetch("/Master_Tree4.svg")
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
						hasNotPlayed({ season, svgContainerRef });
					}
				})
				.catch((error) => {
					console.error("Error fetching SVG:", error);
				});
		}
	}, [season]);

	return (
		<Box
			ref={svgContainerRef}
			sx={{
				position: "absolute",
				zIndex: -2,
				width: "100vw",
				height: "100vh",
				overflow: "hidden", // Hide overflowing horizontal content

				"& svg": {
					position: "absolute",
					width: "auto",
					height: "100%", // SVG fills height of viewport
					left: "50%",
					transform: "translateX(-50%)", // Center horizontally
				},

				// Responsive zoom for split screens
				"@media (max-width: 900px)": {
					"& svg": {
						width: "150%", // Scale width to zoom in, adjust as needed
					},
				},
			}}
		/>
	);
};

export default TreeAnimation;
