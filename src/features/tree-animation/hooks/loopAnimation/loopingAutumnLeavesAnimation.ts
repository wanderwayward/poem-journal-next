import { gsap } from "gsap";
import { RefObject } from "react";

declare interface LeavesAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
}

const loopingAutumnLeaves = ({ svgContainerRef }: LeavesAnimationProps) => {
	if (!svgContainerRef.current) {
		console.log("svgContainerRef not found");
		return;
	}

	console.log("Initializing loopingAutumnLeaves");

	const floatingLeavesGroup = Array.from(
		svgContainerRef.current.querySelectorAll(
			"#Floating_Leaves > #Au_F_L_1, #Floating_Leaves > #Au_F_L_2, #Floating_Leaves > #Au_F_L_3, #Floating_Leaves > #Au_F_L_4, #Floating_Leaves > #Au_F_L_5, #Floating_Leaves > #Au_F_L_6, #Floating_Leaves > #Au_F_L_7, #Floating_Leaves > #Au_F_L_8"
		)
	) as SVGPathElement[];

	if (floatingLeavesGroup.length > 0) {
		console.log("Floating leaves group found", floatingLeavesGroup);

		// Initialize all leaves as visible and in their original positions
		floatingLeavesGroup.forEach((leaf) => {
			gsap.set(leaf, {
				opacity: 1, // Fully visible
				visibility: "visible",
				x: 0,
				y: 0,
				rotate: 0, // No rotation
			});
		});

		const animateLeaves = () => {
			// Randomly pick 1–3 leaves
			const leavesToAnimate = floatingLeavesGroup
				.sort(() => Math.random() - 0.5) // Shuffle
				.slice(0, Math.floor(Math.random() * 3) + 1); // Pick 1–3 leaves

			leavesToAnimate.forEach((leaf) => {
				const timeline = gsap.timeline({
					onComplete: () => {
						// Reset the leaf to its original position and fade it back in
						gsap.set(leaf, { x: 0, y: 0, rotate: 0, opacity: 0 });
						gsap.to(leaf, {
							opacity: 1, // Fade back in
							duration: 5, // Smooth fade-in
							ease: "power1.inOut",
						});
					},
				});

				timeline.to(leaf, {
					x: 100, // Slight horizontal drift
					y: gsap.utils.random(100, 200), // Fall down vertically
					rotate: gsap.utils.random(-50, 50), // Slight rotation
					opacity: 0, // Fade out
					duration: 5, // Animation duration
					ease: "power3.inOut", // Smooth easing
				});
			});

			// Schedule the next batch of animations after a random delay
			gsap.delayedCall(gsap.utils.random(30, 60), animateLeaves);
		};

		// Start the animation loop
		animateLeaves();
	} else {
		console.log("Floating leaves group not found", svgContainerRef.current);
	}
};

export default loopingAutumnLeaves;
