"use client";
import { FC } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { groups } from "../constants/groupSelectors";
import TrunkBranchesAnimation from "../hooks/bootAnimation/trunkBranchesAnimation";
import leavesAnimation from "../hooks/bootAnimation/leavesAnimation";
import flowersAnimation from "../hooks/bootAnimation/flowersAnimation";
import floatingLeavesAnimation from "../hooks/bootAnimation/floatingLeavesAnimation";
import birdsAnimation from "../hooks/bootAnimation/birdsAnimation";
import snowPlopsAnimation from "../hooks/bootAnimation/snowPlopsAnimation";
import winterWindnimation from "../hooks/winterWindAnimation";
import { Box } from "@mui/material";

declare interface TreeAnimationProps {
	season: string;
}

const TreeAnimation: FC<TreeAnimationProps> = ({ season }) => {
	const svgContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		//fetch the svg file
		if (svgContainerRef.current) {
			fetch("/Master_Tree2.svg")
				.then((response) => response.text())
				.then((svgContent) => {
					// Step 0: Set the svg content
					if (svgContainerRef.current) {
						svgContainerRef.current.innerHTML = svgContent;

						// Step 1: Hide all paths initially
						const groupSelectors = groups;

						groupSelectors.forEach((groupSelector) => {
							const group = svgContainerRef.current?.querySelector(
								groupSelector
							) as SVGGElement | null;
							if (group) {
								const paths = group.querySelectorAll<SVGPathElement>("path");
								const polygons =
									group.querySelectorAll<SVGPolygonElement>("polygon");

								paths.forEach((path: SVGPathElement) => {
									gsap.set(path, { visibility: "hidden" });
								});

								polygons.forEach((polygon: SVGPolygonElement) => {
									gsap.set(polygon, { visibility: "hidden" });
								});
							}
						});

						// Step 2: Trunk animation & prep for seasonal animations
						console.log("Season", season);
						const prefix =
							season === "Spring" ? "Sp_" : season === "Summer" ? "Su_" : "Au_";
						console.log("prefix", prefix);

						const leavesSelectors = [
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_First_Quadrant`,
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_Second_Quadrant_A`,
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_Second_Quadrant_B`,
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_Third_Quadrant_A`,
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_Third_Quadrant_B`,
							`#${season}_features > #${prefix}Leaves > #${prefix}Le_Fourth_Quadrant`,
						];

						console.log("leavesSelectors before the switch", leavesSelectors);

						TrunkBranchesAnimation({
							svgContainerRef,
							onComplete: () => {
								// Step 3: Switch case for seasonal animations
								switch (season) {
									case "Spring":
										console.log("spring case hit");

										leavesAnimation({
											svgContainerRef,
											leavesSelectors,
											onComplete: () => {
												console.log(
													"spring leaves animation complete, starting flowers animation"
												);
												flowersAnimation({ svgContainerRef });
											},
										});

										break;
									case "Summer":
										console.log("summer case hit");

										leavesAnimation({
											svgContainerRef,
											leavesSelectors,
											onComplete: () => {
												birdsAnimation({ svgContainerRef, repeat: 3 });
											},
										});

										break;
									case "Autumn":
										console.log("autumn case hit");
										leavesAnimation({
											svgContainerRef,
											leavesSelectors,
											onComplete: () => {
												console.log("autumn leaves animation complete");
												floatingLeavesAnimation({ svgContainerRef });
											},
										});
										break;
									case "Winter":
										console.log("winter case hit");
										snowPlopsAnimation({
											svgContainerRef,
											onComplete: () => {
												console.log("snow plops animation complete");
												winterWindnimation({ svgContainerRef });
											},
										});
										break;
									default:
										break;
								}
							},
						});
					}
				});
		}
	}, [season]);

	return (
		<Box
			ref={svgContainerRef}
			sx={{
				position: "absolute",
				left: 0, // Ensure it starts from the left edge
				right: 0, // Ensure it stretches to the right edge
				width: "100%", // Full width of the screen or parent container
				height: "auto", // Maintain aspect ratio
			}}
		></Box>
	);
};

export default TreeAnimation;
