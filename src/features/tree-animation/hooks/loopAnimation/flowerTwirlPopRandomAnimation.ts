import { gsap } from "gsap";
import { RefObject } from "react";

declare interface FlowersAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
}

const flowerTwirlPopRandomAnimation = ({
	svgContainerRef,
}: FlowersAnimationProps) => {
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
			scale: 1,
			opacity: 1,
			transformOrigin: "center",
			visibility: "visible", // Ensure they are visible
		});
	});

	// Function to randomly animate flowers
	const animateRandomFlowers = () => {
		const randomFlowers = flowerGroups
			.sort(() => Math.random() - 0.5)
			.slice(0, 2); // Randomly pick 1-2 flowers
		randomFlowers.forEach((flower) => {
			const timeline = gsap.timeline({
				onComplete: () => {
					// Schedule the next animation after a random delay multiplied by X for a range of 0-X seconds + Y seconds for a base delay between animations
					gsap.delayedCall(Math.random() * 30 + 30, animateRandomFlowers);
				},
			});

			// Slight pop and twirl
			timeline
				.to(flower, {
					scale: 1.1, // Slight pop
					duration: 0.1,
					ease: "power1.out", // Smooth easing for the pop
				})
				.to(flower, {
					rotation: 360, // Full twirl
					scale: 1.1, // Maintain the scale during the twirl
					duration: 1.5,
					ease: "power1.inOut", // Smooth easing for the twirl
				})
				.to(flower, {
					scale: 1, // Return to normal scale
					duration: 0.1,
					ease: "power1.in", // Smooth easing for returning to normal
				});
		});
	};

	// Start the random flower animation
	animateRandomFlowers();
};

export default flowerTwirlPopRandomAnimation;
