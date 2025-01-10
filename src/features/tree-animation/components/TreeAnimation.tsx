// src/components/TreeAnimation.tsx
"use client";
import { FC, useEffect, useRef } from "react";

import { Box } from "@mui/material";

// Import the refactored functions
import hasPlayed from "../animations/hasPlayed";
import hasNotPlayed from "../animations/hasNotPlayed";

declare interface TreeAnimationProps {
	season: string;
}

const TreeAnimation: FC<TreeAnimationProps> = ({ season }) => {
	// Hard-coded hasPlayed flag
	const hasPlayedFlag = false;
	const svgContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("starting useEffect");
		// Fetch the SVG file
		if (svgContainerRef.current) {
			fetch("/Master_Tree3.svg")
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
				zIndex: -1,
				bottom: 0, // Ensure it stretches to the bottom edge
				left: 0, // Ensure it starts from the left edge
				right: 0, // Ensure it stretches to the right edge
				width: "100%", // Full width of the screen or parent container
				height: "auto", // Maintain aspect ratio
			}}
		></Box>
	);
};

export default TreeAnimation;
