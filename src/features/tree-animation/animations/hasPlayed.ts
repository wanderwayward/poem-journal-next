// src/animations/hasPlayed.ts
import { gsap } from "gsap";
import { groups } from "../constants/groupSelectors";

import flowerTwirlPopRandomAnimation from "../hooks/loopAnimation/flowerTwirlPopRandomAnimation";
import birdsMovementAnimation from "../hooks/loopAnimation/birdsMovementAnimation";
import loopingAutumnLeavesAnimation from "../hooks/loopAnimation/loopingAutumnLeavesAnimation";
import persistentWinterWindAnimation from "../hooks/loopAnimation/persistentWinterWindAnimation";

interface HasPlayedProps {
	season: string;
	svgContainerRef: React.RefObject<HTMLDivElement | null>;
}

const hasPlayed = ({ season, svgContainerRef }: HasPlayedProps) => {
	if (!svgContainerRef.current) return;

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

	// Iterate through all groups and hide/show based on season
	groups.forEach((selector) => {
		const element = svgContainerRef.current?.querySelector(selector);
		if (element) {
			if (
				trunkSelectors.includes(selector) ||
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

	// Play subtle animations based on the season
	switch (season) {
		case "Spring":
			flowerTwirlPopRandomAnimation({ svgContainerRef });
			break;
		case "Summer":
			birdsMovementAnimation({ svgContainerRef, repeat: 5 });
			break;
		case "Autumn":
			loopingAutumnLeavesAnimation({ svgContainerRef });
			break;
		case "Winter":
			persistentWinterWindAnimation({ svgContainerRef });
			break;
		default:
			break;
	}
};

export default hasPlayed;
