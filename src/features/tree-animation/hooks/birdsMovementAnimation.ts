import { gsap } from "gsap";
import { RefObject } from "react";

declare interface BirdsMovementAnimationProps {
	svgContainerRef: RefObject<HTMLDivElement | null>;
	repeat: number;
}

const birdsMovementAnimation = ({
	svgContainerRef,
	repeat,
}: BirdsMovementAnimationProps) => {
	const topBirdWingsSelectors = [
		"#Summer_features > #Su_Bird_Top > #Su_Bird_Top_Wing_1",
		"#Summer_features > #Su_Bird_Top > #Su_Bird_Top_Wing_2",
	];
	const botBirdWingsSelectors = [
		"#Summer_features > #Su_Bird_Bot > #Su_Bird_Bot_Wing_1",
		"#Summer_features > #Su_Bird_Bot > #Su_Bird_Bot_Wing_2",
	];

	const topBirdBodySelectors = [
		"#Summer_features > #Su_Bird_Top > #Su_Bird_Top_Body",
	];
	const botBirdBodySelectors = [
		"#Summer_features > #Su_Bird_Bot > #Su_Bird_Bot_Body",
	];

	const topBirdWingsGroups = topBirdWingsSelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	const botBirdWingsGroups = botBirdWingsSelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	const topBirdBodyGroup = topBirdBodySelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	const botBirdBodyGroup = botBirdBodySelectors
		.map((selector) => svgContainerRef.current?.querySelector(selector))
		.filter(Boolean) as SVGGElement[];

	// Set initial state with the correct transform origin
	topBirdWingsGroups.forEach((group) => {
		const children = Array.from(group.querySelectorAll("path, polygon"));
		gsap.set([group, ...children], {
			rotate: 0,
		});
	});

	botBirdWingsGroups.forEach((group) => {
		const children = Array.from(group.querySelectorAll("path, polygon"));
		gsap.set([group, ...children], {
			rotate: 0,
		});
	});

	topBirdBodyGroup.forEach((group) => {
		const children = Array.from(group.querySelectorAll("path, polygon"));
		gsap.set([group, ...children], {
			rotate: 0,
		});
	});

	botBirdBodyGroup.forEach((group) => {
		const children = Array.from(group.querySelectorAll("path, polygon"));
		gsap.set([group, ...children], {
			rotate: 0,
		});
	});

	// Animate the bird wings to flap in sequence
	topBirdWingsGroups.forEach((group, index) => {
		const children = group.querySelectorAll("path, polygon");

		gsap.to([group, children], {
			y: 0,
			rotate: -1, // Adjust rotation for flap effect
			duration: 1,
			ease: "elastic.in(1, 0.5)",
			delay: index * 0.1, // Stagger between each wing group
			repeat,
			yoyo: true,
		});
	});

	botBirdWingsGroups.forEach((group, index) => {
		const children = group.querySelectorAll("path, polygon");

		gsap.to([group, children], {
			y: 0,
			rotate: -1, // Adjust rotation for flap effect
			duration: 1,
			ease: "elastic.in(1, 0.5)",
			delay: index * 0.1, // Stagger between each wing group
			repeat,
			yoyo: true,
		});
	});

	// Animate the bird body to move and rotate slightly
	topBirdBodyGroup.forEach((group, index) => {
		const children = group.querySelectorAll("path, polygon");

		gsap.to([group, children], {
			y: -2, // Adding slight y movement for the body
			rotate: -1, // Adjust rotation for slight body movement
			duration: 1,
			ease: "elastic.in(1, 0.5)",
			delay: index * 0.1, // Stagger between each body group
			repeat,
			yoyo: true,
		});
	});

	botBirdBodyGroup.forEach((group, index) => {
		const children = group.querySelectorAll("path, polygon");

		gsap.to([group, children], {
			y: -2, // Adding slight y movement for the body
			rotate: -1, // Adjust rotation for slight body movement
			duration: 1,
			ease: "elastic.in(1, 0.5)",
			delay: index * 0.1, // Stagger between each body group
			repeat,
			yoyo: true,
		});
	});
};

export default birdsMovementAnimation;
