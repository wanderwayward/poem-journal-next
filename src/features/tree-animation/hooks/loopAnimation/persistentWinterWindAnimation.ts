import { gsap } from "gsap";
import { RefObject } from "react";

declare interface PersistentWinterWindAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
}

const persistentWinterWindAnimation = ({
	svgContainerRef,
}: PersistentWinterWindAnimationProps) => {
	if (svgContainerRef.current) {
		const windSelectors = [
			"#Winter_features > #Wi_Wind > #Wind_1",
			"#Winter_features > #Wi_Wind > #Wind_2",
			"#Winter_features > #Wi_Wind > #Wind_3",
			"#Winter_features > #Wi_Wind > #Wind_4",
		];

		const timeline = gsap.timeline({ repeat: -1, delay: 5 }); // Repeat forever, with a big delay between cycles

		windSelectors.forEach((selector) => {
			const windPath = svgContainerRef.current?.querySelector(
				selector
			) as SVGPathElement | null;

			if (windPath) {
				const pathLength = windPath.getTotalLength();

				// Ensure the path is visible initially
				gsap.set(windPath, {
					strokeDasharray: pathLength,
					strokeDashoffset: 0, // Fully visible
					opacity: 1, // Fully visible
					visibility: "visible",
					fill: "#acdcee",
				});

				// Add the fade-out and fade-in animation for this path to the timeline
				timeline
					.to(windPath, {
						opacity: 0, // Fade out
						duration: 1,
						ease: "power1.inOut",
					})
					.to(
						windPath,
						{
							opacity: 1, // Fade back in
							duration: 1,
							ease: "power1.inOut",
						},
						"+=0.5"
					); // Small pause after fade-out
			}
		});

		// Add a big delay before the whole cycle restarts
		timeline.addPause("+=10");
	}
};

export default persistentWinterWindAnimation;
