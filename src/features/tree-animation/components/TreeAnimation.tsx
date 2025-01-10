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
import winterWindAnimation from "../hooks/bootAnimation/winterWindAnimation";
import persistentWinterWindAnimation from "../hooks/loopAnimation/persistentWinterWindAnimation";
import birdsMovementAnimation from "../hooks/loopAnimation/birdsMovementAnimation";
import flowerTwirlPopRandomAnimation from "../hooks/loopAnimation/flowerTwirlPopRandomAnimation";
import loopingAutumnLeavesAnimation from "../hooks/loopAnimation/loopingAutumnLeavesAnimation";
import { Box } from "@mui/material";

declare interface TreeAnimationProps {
	season: string;
}

const TreeAnimation: FC<TreeAnimationProps> = ({ season }) => {
	const hasPlayed = true;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		console.log("starting useEffect");
		//fetch the svg file
		if (svgContainerRef.current) {
			fetch("/Master_Tree3.svg")
				.then((response) => response.text())
				.then((svgContent) => {
					console.log("svg has been fetched");
					// Step 0: Set the svg content
					if (svgContainerRef.current) {
						svgContainerRef.current.innerHTML = svgContent;

						console.log("about to check hasPlayed", hasPlayed);

						if (hasPlayed) {
							console.log("inside hasPlayed");
							// Mapping of seasonal features for filtering
							const seasonFeatureMapping: Record<string, string[]> = {
								Winter: ["#Winter_features"],
								Summer: ["#Summer_features"],
								Autumn: ["#Autumn_features"],
								Spring: ["#Spring_features"],
							};

							// Selectors for the trunk structure (always visible)
							const trunkSelectors = [
								"#Trunk_Mid",
								"#Trunk_Up",
								"#Primary_Branches > #Branch_2",
								"#Primary_Branches > #Branch_3",
								"#Secondary_Branches > #Branch_2_3",
								"#Secondary_Branches > #Branch_2_2_1",
								"#Secondary_Branches > #Branch_2_2_2",
							];

							// Get all relevant selectors for the current season
							const currentSeasonSelectors = seasonFeatureMapping[season] || [];

							console.log(
								"about to iterate through all groups and hide/show based on season"
							);

							// Iterate through all groups and hide/show based on season
							groups.forEach((selector) => {
								const element =
									svgContainerRef.current?.querySelector(selector);
								if (element) {
									if (
										trunkSelectors.includes(selector) || // Always keep trunk structure visible
										currentSeasonSelectors.some((seasonSelector) =>
											selector.startsWith(seasonSelector)
										)
									) {
										gsap.set(element, { visibility: "visible" });
									} else {
										gsap.set(element, { visibility: "hidden" });
									}
								}
							});

							console.log(
								"About to enter switch case for hasPlayed and season",
								season
							);

							// Play subtle animations based on the season
							switch (season) {
								case "Spring":
									console.log("hasPlayed and spring");
									flowerTwirlPopRandomAnimation({ svgContainerRef }); // Subtle flowers animation
									break;
								case "Summer":
									console.log("hasPlayed and summer");
									birdsMovementAnimation({ svgContainerRef, repeat: 5 }); // Subtle birds animation
									break;
								case "Autumn":
									console.log("hasPlayed and autumn");
									loopingAutumnLeavesAnimation({ svgContainerRef }); // Subtle wind animation
									break;
								case "Winter":
									console.log("hasPlayed and winter");
									persistentWinterWindAnimation({ svgContainerRef }); // Subtle wind animation
									break;
								// Add similar cases for Spring and Autumn when their animations are ready
								default:
									break;
							}

							return; // Ensure no further processing happens when hasPlayed is true
						}
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
												winterWindAnimation({ svgContainerRef, repeat: -1 });
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
