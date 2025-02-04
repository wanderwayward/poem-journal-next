import { gsap } from "gsap";
import { RefObject, FC } from "react";

declare interface TrunkBranchesAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	onComplete?: () => void;
	isMobile: boolean;
}

const TrunkBranchesAnimation = ({
	svgContainerRef,
	onComplete,
	isMobile,
}: TrunkBranchesAnimationProps) => {
	if (svgContainerRef.current) {
		// Animate the trunk bot first
		const trunkBot = svgContainerRef.current.querySelector(
			"#Trunk_Bot"
		) as SVGPathElement | null;

		if (trunkBot) {
			const length = trunkBot.getTotalLength();
			const timeline = gsap.timeline({
				onComplete: () => {
					if (onComplete) {
						console.log("trunk branches animation completed");
						onComplete();
					}
				},
			});

			if (isMobile) {
				// Vertical animation using clipPath
				gsap.set(trunkBot, {
					visibility: "hidden",
					clipPath: "inset(100% 0 0 0)", // Start fully hidden from the bottom
				});

				timeline.to(trunkBot, {
					visibility: "visible",
					clipPath: "inset(0% 0 0 0)", // Reveal by reducing clipPath
					duration: (length / 5000) * 1.5, // Lengthen duration for smoother vertical animation
					ease: "power1.inOut",
				});
			} else {
				// Horizontal animation using clipPath
				gsap.set(trunkBot, {
					visibility: "hidden",
					clipPath: "inset(0 100% 0 0)", // Start fully hidden from the right
				});

				timeline.to(trunkBot, {
					visibility: "visible",
					clipPath: "inset(0 0% 0 0)", // Reveal by reducing clipPath horizontally
					duration: length / 5000,
					ease: "power1.inOut",
				});
			}

			// Animate the rest of the tree structure after Trunk_Bot
			const trunkGroupSelectors = [
				"#Trunk_Up",
				"#Trunk_Mid",
				"#Primary_Branches",
				"#Secondary_Branches",
			];

			trunkGroupSelectors.forEach((trunkGroupSelector) => {
				const trunkGroup = svgContainerRef.current?.querySelector(
					trunkGroupSelector
				) as SVGGElement | null;

				if (trunkGroup) {
					const paths = trunkGroup.querySelectorAll<SVGPathElement>("path");

					paths.forEach((path: SVGPathElement) => {
						const pathLength = path.getTotalLength();

						if (isMobile) {
							// Vertical animation: Reveal from bottom to top
							gsap.set(path, {
								visibility: "hidden",
								clipPath: "inset(100% 0 0 0)", // Start fully hidden from the bottom
							});

							timeline.to(
								path,
								{
									visibility: "visible",
									clipPath: "inset(0% 0 0 0)", // Reveal from bottom to top
									duration: (pathLength / 3500) * 1.5, // Adjusted duration for smoother animation
									ease: "power1.inOut",
								},
								"-=0.5" // Overlap animations slightly for continuous flow
							);
						} else {
							// Horizontal animation: Reveal from left to right
							gsap.set(path, {
								visibility: "hidden",
								clipPath: "inset(0 100% 0 0)", // Start fully hidden from the right
							});

							timeline.to(
								path,
								{
									visibility: "visible",
									clipPath: "inset(0 0% 0 0)", // Reveal horizontally
									duration: pathLength / 3500,
									ease: "power1.inOut",
								},
								"-=0.5" // Overlap animations slightly for continuous flow
							);
						}
					});
				}
			});
		}
	}
};

export default TrunkBranchesAnimation;
