// src/animations/hasNotPlayed.ts
import { gsap } from "gsap";
import { groups } from "../constants/groupSelectors";

import leavesAnimation from "../hooks/bootAnimation/leavesAnimation";
import flowersAnimation from "../hooks/bootAnimation/flowersAnimation";
import birdsAnimation from "../hooks/bootAnimation/birdsAnimation";
import TrunkBranchesAnimation from "../hooks/bootAnimation/trunkBranchesAnimation";
import floatingLeavesAnimation from "../hooks/bootAnimation/floatingLeavesAnimation";
import snowPlopsAnimation from "../hooks/bootAnimation/snowPlopsAnimation";
import winterWindAnimation from "../hooks/bootAnimation/winterWindAnimation";

interface HasNotPlayedProps {
	season: string;
	svgContainerRef: React.RefObject<HTMLDivElement | null>;
}

const hasNotPlayed = ({ season, svgContainerRef }: HasNotPlayedProps) => {
	if (!svgContainerRef.current) return;

	// Step 1: Hide all paths initially
	groups.forEach((groupSelector) => {
		const group = svgContainerRef.current?.querySelector(
			groupSelector
		) as SVGGElement | null;
		if (group) {
			const paths = group.querySelectorAll<SVGPathElement>("path");
			const polygons = group.querySelectorAll<SVGPolygonElement>("polygon");

			paths.forEach((path) => {
				gsap.set(path, { visibility: "hidden" });
			});

			polygons.forEach((polygon) => {
				gsap.set(polygon, { visibility: "hidden" });
			});
		}
	});

	const overlay = svgContainerRef.current.querySelector("#Has_Played");
	if (overlay) {
		console.log("hasNotPlayed: overlay found and set to hidden");
		gsap.set(overlay, { visibility: "hidden" });
	} else {
		console.log("hasNotPlayed: #Has_Played not found");
	}

	// Step 2: Trunk animation & prep for seasonal animations
	const prefix =
		season === "Spring" ? "Sp_" : season === "Summer" ? "Su_" : "Au_";

	const leavesSelectors = [
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_First_Quadrant`,
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_Second_Quadrant_A`,
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_Second_Quadrant_B`,
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_Third_Quadrant_A`,
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_Third_Quadrant_B`,
		`#${season}_features > #${prefix}Leaves > #${prefix}Le_Fourth_Quadrant`,
	];

	TrunkBranchesAnimation({
		svgContainerRef,
		onComplete: () => {
			// Step 3: Switch case for seasonal animations
			switch (season) {
				case "Spring":
					leavesAnimation({
						svgContainerRef,
						leavesSelectors,
						onComplete: () => {
							flowersAnimation({ svgContainerRef });
						},
					});
					break;
				case "Summer":
					leavesAnimation({
						svgContainerRef,
						leavesSelectors,
						onComplete: () => {
							birdsAnimation({ svgContainerRef, repeat: 3 });
						},
					});
					break;
				case "Autumn":
					leavesAnimation({
						svgContainerRef,
						leavesSelectors,
						onComplete: () => {
							floatingLeavesAnimation({ svgContainerRef });
						},
					});
					break;
				case "Winter":
					snowPlopsAnimation({
						svgContainerRef,
						onComplete: () => {
							winterWindAnimation({ svgContainerRef, repeat: -1 });
						},
					});
					break;
				default:
					break;
			}
		},
	});
};

export default hasNotPlayed;
