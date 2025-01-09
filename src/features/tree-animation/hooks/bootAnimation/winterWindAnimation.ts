import { gsap } from "gsap";
import { RefObject } from "react";

declare interface WinterWindAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	repeat: number;
}
const winterWindAnimation = ({
	svgContainerRef,
	repeat,
}: WinterWindAnimationProps) => {
	if (svgContainerRef.current) {
		const windSelectors = [
			"#Winter_features > #Wi_Wind > #Wind_1",
			"#Winter_features > #Wi_Wind > #Wind_2",
			"#Winter_features > #Wi_Wind > #Wind_3",
			"#Winter_features > #Wi_Wind > #Wind_4",
		];

		const timeline = gsap.timeline({ repeat: repeat });

		windSelectors.forEach((selector) => {
			const windPath = svgContainerRef.current?.querySelector(
				selector
			) as SVGPathElement | null;

			if (windPath) {
				const pathLength = windPath.getTotalLength();

				// Start with paths hidden
				gsap.set(windPath, {
					strokeDasharray: pathLength,
					strokeDashoffset: pathLength,
					opacity: 0,
					fill: "#acdcee",
				});

				// Animate the path with both stroke offset and opacity
				timeline.to(
					windPath,
					{
						strokeDashoffset: 0,
						visibility: "visible",
						opacity: 1,
						duration: 0.1,
						ease: "power1.inOut",
					},
					"-=0.1"
				);

				// Optional: Fade out before the next animation loop
				timeline.to(
					windPath,
					{
						opacity: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"+=0.1"
				);
			}
		});

		timeline.play();
	}
};

export default winterWindAnimation;
