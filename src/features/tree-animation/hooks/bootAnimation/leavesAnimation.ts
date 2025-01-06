import { gsap } from "gsap";
import { RefObject } from "react";

declare interface LeavesAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	leavesSelectors: string[];
	onComplete?: () => void;
}

const leavesAnimation = ({
	leavesSelectors,
	svgContainerRef,
	onComplete,
}: LeavesAnimationProps) => {
	if (leavesSelectors) {
		console.log("selectors found", leavesSelectors);

		// Create a GSAP timeline for sequential control
		const tl = gsap.timeline({ onComplete });

		// Function to animate each group of paths
		const animateLeavesGroup = (groupSelector: string) => {
			const leavesGroup = svgContainerRef.current?.querySelector(
				groupSelector
			) as SVGGElement | null;
			if (leavesGroup) {
				const paths = leavesGroup.querySelectorAll<SVGPathElement>("path");

				paths.forEach((path: SVGPathElement) => {
					gsap.set(path, {
						scaleX: 0,
						rotate: 90,
						opacity: 0,
						transformOrigin: "bottom",
					});
				});

				tl.to(paths, {
					scaleX: 1,
					opacity: 1,
					rotate: 0,
					duration: 0.1,
					visibility: "visible",
					stagger: 0.01,
					ease: "circ.out",
				});
			}
		};

		// Animate the quadrants in sequence
		animateLeavesGroup(leavesSelectors[0]); // First Quadrant

		tl.add(() => {
			animateLeavesGroup(leavesSelectors[1]); // Second Quadrant A
			animateLeavesGroup(leavesSelectors[2]); // Second Quadrant B
		}, "+=0.01"); // Delay between groups

		tl.add(() => {
			animateLeavesGroup(leavesSelectors[3]); // Third Quadrant A
			animateLeavesGroup(leavesSelectors[4]); // Third Quadrant B
		}, "+=0.01");

		tl.add(() => {
			animateLeavesGroup(leavesSelectors[5]); // Fourth Quadrant
		}, "+=0.01");
	}
};

export default leavesAnimation;
