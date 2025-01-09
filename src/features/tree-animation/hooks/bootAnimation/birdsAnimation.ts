import { gsap } from "gsap";
import { RefObject } from "react";
import birdsMovementAnimation from "../loopAnimation/birdsMovementAnimation";

declare interface BirdsAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	repeat: number;
}

const birdsAnimation = ({ svgContainerRef, repeat }: BirdsAnimationProps) => {
	const BirdsSelectors = [
		"#Summer_features > #Su_Bird_Top",
		"#Summer_features > #Su_Bird_Bot",
	];

	const tl = gsap.timeline({
		onComplete: () => {
			console.log("Birds animation complete");
			console.log("Starting bird wings animation");
			birdsMovementAnimation({ svgContainerRef, repeat });
		},
	});

	const birdGroups = BirdsSelectors.map((selector) =>
		svgContainerRef.current?.querySelector(selector)
	).filter(Boolean) as SVGGElement[];

	birdGroups.forEach((group) => {
		const children = Array.from(group.querySelectorAll("path, polygon, g")); // Select all paths, polygons, and subgroups

		// Set initial state
		gsap.set([group, ...children], {
			visibility: "visible",
			opacity: 0, // Start with 0 opacity, fade them in
		});

		// Animate the fade-in for the group and its children
		tl.to([group, ...children], {
			opacity: 1,
			duration: 0.5,
			ease: "power1.out", // Smooth easing function
		});
	});
};

export default birdsAnimation;
