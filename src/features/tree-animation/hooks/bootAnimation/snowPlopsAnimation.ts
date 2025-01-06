import { gsap } from "gsap";
import { RefObject } from "react";

declare interface SnowPlopsAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	onComplete: () => void;
}

const snowPlopsAnimation = ({
	svgContainerRef,
	onComplete,
}: SnowPlopsAnimationProps) => {
	const snowPlopsSelectors = [
		"#Winter_features > #Wi_Snow > #Wi_Sn_1",
		"#Winter_features > #Wi_Snow > #Wi_Sn_2",
		"#Winter_features > #Wi_Snow > #Wi_Sn_3",
		"#Winter_features > #Wi_Snow > #Wi_Sn_4",
	];

	const snowPlopGroups = snowPlopsSelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	// Set initial state for all flower groups and their child elements
	snowPlopGroups.forEach((group) => {
		const children = group.querySelectorAll("path, polygon"); // Select all paths and polygons within the group

		gsap.set([group, children], {
			scale: 0,

			opacity: 0,
			transformOrigin: "center",
		});
	});

	// Animate the flower groups to pop in sequentially
	snowPlopGroups.forEach((group, index) => {
		const children = group.querySelectorAll("path, polygon");

		gsap.to([group, children], {
			scale: 1,
			opacity: 1,
			visibility: "visible", // Make visible as they animate in
			duration: 0.2,
			ease: "elastic.out(1, 0.5)",
			delay: index * 0.2, // Stagger between each flower group
		});
	});
	if (onComplete) {
		onComplete();
	}
};

export default snowPlopsAnimation;
