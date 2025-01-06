import { gsap } from "gsap";
import { RefObject } from "react";

declare interface FlowersAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
}

const flowersAnimation = ({ svgContainerRef }: FlowersAnimationProps) => {
	const flowersSelectors = [
		"#Spring_features > #Flowers > #Sp_F_1",
		"#Spring_features > #Flowers > #Sp_F_2",
		"#Spring_features > #Flowers > #Sp_F_3",
		"#Spring_features > #Flowers > #Sp_F_4",
		"#Spring_features > #Flowers > #Sp_F_5",
		"#Spring_features > #Flowers > #Sp_F_6",
		"#Spring_features > #Flowers > #Sp_F_7",
		"#Spring_features > #Flowers > #Sp_F_8",
		"#Spring_features > #Flowers > #Sp_F_9",
		"#Spring_features > #Flowers > #Sp_F_10",
	];

	const flowerGroups = flowersSelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	// Set initial state for all flower groups and their child elements
	flowerGroups.forEach((group) => {
		const children = group.querySelectorAll("path, polygon"); // Select all paths and polygons within the group

		gsap.set([group, children], {
			scale: 0,
			opacity: 0,
			transformOrigin: "center",
			visibility: "hidden", // Start hidden
		});
	});

	// Animate the flower groups to pop in sequentially
	flowerGroups.forEach((group, index) => {
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
};

export default flowersAnimation;
