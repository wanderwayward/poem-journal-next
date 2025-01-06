import { gsap } from "gsap";
import { RefObject, FC } from "react";

declare interface TrunkBranchesAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	onComplete?: () => void;
}

const TrunkBranchesAnimation = ({
	svgContainerRef,
	onComplete,
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

			// Set initial state for Trunk_Bot
			gsap.set(trunkBot, {
				visibility: "hidden",
				clipPath: "inset(0 100% 0 0)",
			});

			// Animate the Trunk_Bot path first
			timeline.to(trunkBot, {
				visibility: "visible",
				clipPath: "inset(0 0% 0 0)",
				duration: length / 5000,
				ease: "power1.inOut",
			});

			// Animate the rest of the tree structure simultaneously after Trunk_Bot
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

					// Set initial state for all paths
					gsap.set(paths, {
						visibility: "hidden",
						clipPath: "inset(0 100% 0 0)",
					});

					// Animate all paths simultaneously
					paths.forEach((path: SVGPathElement) => {
						const pathLength = path.getTotalLength();

						timeline.to(
							path,
							{
								visibility: "visible",
								clipPath: "inset(0 0% 0 0)",
								duration: pathLength / 3500,
								ease: "power1.inOut",
							},
							"-=0.5" // This overlaps the animations slightly to start together
						);
					});
				}
			});
		}
	}
};

export default TrunkBranchesAnimation;
