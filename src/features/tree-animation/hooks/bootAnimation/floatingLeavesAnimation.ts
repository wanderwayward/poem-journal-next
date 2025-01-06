import { gsap } from "gsap";
import { RefObject } from "react";

declare interface LeavesAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
}

const floatingLeavesAnimation = ({ svgContainerRef }: LeavesAnimationProps) => {
	if (!svgContainerRef.current) {
		console.log("svgContainerRef not found");
	} else {
		console.log("initializing floatingLeavesAnimation");

		const floatingLeavesGroup = svgContainerRef.current?.querySelectorAll(
			"#Floating_Leaves > #Au_F_L_1, #Floating_Leaves > #Au_F_L_2, #Floating_Leaves > #Au_F_L_3, #Floating_Leaves > #Au_F_L_4, #Floating_Leaves > #Au_F_L_5, #Floating_Leaves > #Au_F_L_6, #Floating_Leaves > #Au_F_L_7, #Floating_Leaves > #Au_F_L_8"
		) as NodeListOf<SVGPathElement>;

		if (floatingLeavesGroup) {
			console.log("floatingLeavesGroup found", floatingLeavesGroup);
			floatingLeavesGroup.forEach((floatingLeaves) => {
				gsap.set(floatingLeaves, {
					x: -400,
					scaleY: 0, // Start from a vertically compressed state
					rotate: 360,
					opacity: 0,
					transformOrigin: "bottom", // Unfold from the bottom
				});

				gsap.to(floatingLeaves, {
					x: 0,
					scaleY: 1, // Unfold to its natural height
					opacity: 1,
					rotate: 0,
					duration: 0.8,
					visibility: "visible",
					stagger: 0.9,
					ease: "circ.out", // Use a smooth, natural easing function
				});
			});
		} else {
			console.log("floatingLeavesGroup not found", svgContainerRef.current);
		}
	}
};

export default floatingLeavesAnimation;
