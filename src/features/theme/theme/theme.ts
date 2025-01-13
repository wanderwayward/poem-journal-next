// theme.ts
import { ThemeOptions } from "@mui/material/styles";

export type Season = "spring" | "summer" | "autumn" | "winter";

/**
 * getDesignTokens
 *
 * @param mode   "light" or "dark"
 * @param season "spring" | "summer" | "autumn" | "winter"
 * @returns      MUI ThemeOptions
 */
export const getDesignTokens = (
	mode: "light" | "dark",
	season: Season
): ThemeOptions => {
	// ------------------------------
	// 1) Spring Palettes
	// ------------------------------
	const springLight = {
		primary: {
			light: "#C3E09A",
			main: "#9AB856",
			dark: "#6A833D",
			contrastText: "#FFFFFF",
		},
		secondary: {
			light: "#FAD4C8",
			main: "#F7B3A4",
			dark: "#CC7F6A",
			contrastText: "#FFFFFF",
		},
		error: {
			light: "#E8A0A0",
			main: "#D47474",
			dark: "#AB4545",
			contrastText: "#FFFFFF",
		},
		warning: {
			light: "#FFDAC6",
			main: "#FCBF49",
			dark: "#FA9500",
			contrastText: "#000000",
		},
		info: {
			light: "#B0D0D3",
			main: "#388659",
			dark: "#003E1F",
			contrastText: "#FFFFFF",
		},
		success: {
			light: "#CDEBCF",
			main: "#A8D4AA",
			dark: "#87B286",
			contrastText: "#FFFFFF",
		},
		neutral: {
			light: "#F0E5D8",
			main: "#E9E4E1",
			dark: "#C7B59A",
			contrastText: "#264653",
		},
		background: {
			default: "#FFFFFF",
			paper: "#F8F8F8",
		},
		text: {
			primary: "#264653",
			secondary: "rgba(38,70,83,0.7)",
			disabled: "rgba(38,70,83,0.5)",
		},
		divider: "rgba(38,70,83,0.12)",
	};

	const springDark = {
		primary: {
			light: "#A1A69E",
			main: "#003E1F",
			dark: "#1B3A31",
			contrastText: "#E9ECF5",
		},
		secondary: {
			light: "#E8B0A1",
			main: "#9C3848",
			dark: "#74121D",
			contrastText: "#E9ECF5",
		},
		error: {
			light: "#EABFCB",
			main: "#CD8987",
			dark: "#9C3848",
			contrastText: "#E9ECF5",
		},
		warning: {
			light: "#E6C5A5",
			main: "#E69500",
			dark: "#CC7A00",
			contrastText: "#E9ECF5",
		},
		info: {
			light: "#8FB2C3",
			main: "#2B5B5F",
			dark: "#002F33",
			contrastText: "#E9ECF5",
		},
		success: {
			light: "#B5C2B2",
			main: "#4A6040",
			dark: "#2F3C2B",
			contrastText: "#E9ECF5",
		},
		neutral: {
			light: "#707974",
			main: "#545D58",
			dark: "#3A413C",
			contrastText: "#E9ECF5",
		},
		background: {
			default: "#0B2027",
			paper: "#264653",
		},
		text: {
			primary: "#E9ECF5",
			secondary: "rgba(233,236,245,0.7)",
			disabled: "rgba(233,236,245,0.5)",
		},
		divider: "rgba(233,236,245,0.12)",
	};

	// ------------------------------
	// 2) Summer Palettes (placeholder)
	// ------------------------------
	const summerLight = {
		// Copy or customize as needed
		primary: {
			light: "#b0e3b8",
			main: "#86cf91",
			dark: "#58a662",
			contrastText: "#ffffff",
		},
		secondary: {
			light: "#ffd7a8",
			main: "#ffc170",
			dark: "#cc9705",
			contrastText: "#000000",
		},
		// ... error, warning, info, success, etc.
		// Just placeholders, can copy from spring or define your own
	};

	const summerDark = {
		// Copy or customize as needed
		primary: {
			light: "#86cf91",
			main: "#58a662",
			dark: "#397b44",
			contrastText: "#E9ECF5",
		},
		secondary: {
			light: "#ffc170",
			main: "#cc9705",
			dark: "#996f04",
			contrastText: "#E9ECF5",
		},
		// ... placeholders
	};

	// ------------------------------
	// 3) Autumn Palettes (placeholder)
	// ------------------------------
	const autumnLight = {
		primary: {
			light: "#f7b789",
			main: "#EC8411", // from your autumn color
			dark: "#b4630a",
			contrastText: "#ffffff",
		},
		// ... placeholders for secondary, error, etc.
	};

	const autumnDark = {
		primary: {
			light: "#d0856b",
			main: "#c24b13",
			dark: "#89360e",
			contrastText: "#E9ECF5",
		},
		// ... placeholders
	};

	// ------------------------------
	// 4) Winter Palettes (placeholder)
	// ------------------------------
	const winterLight = {
		primary: {
			light: "#c3e3f9",
			main: "#ACDCEE",
			dark: "#72adc3",
			contrastText: "#264653",
		},
		// ... placeholders
	};

	const winterDark = {
		primary: {
			light: "#6591a2",
			main: "#3A6CB1",
			dark: "#2a4e82",
			contrastText: "#E9ECF5",
		},
		// ... placeholders
	};

	// ------------------------------
	// 5) Determine which palette to use
	// ------------------------------
	let selectedPalette = {};
	switch (season) {
		case "spring":
			selectedPalette = mode === "light" ? springLight : springDark;
			break;
		case "summer":
			selectedPalette = mode === "light" ? summerLight : summerDark;
			break;
		case "autumn":
			selectedPalette = mode === "light" ? autumnLight : autumnDark;
			break;
		case "winter":
			selectedPalette = mode === "light" ? winterLight : winterDark;
			break;
		default:
			// fallback: just do spring
			selectedPalette = mode === "light" ? springLight : springDark;
			break;
	}

	// ------------------------------
	// 6) Return MUI ThemeOptions
	// ------------------------------
	return {
		palette: {
			mode,
			...selectedPalette,
		},
		breakpoints: {
			values: {
				xs: 0, // Extra small
				sm: 480, // Small
				md: 768, // Medium
				lg: 1024, // Large
				xl: 1440, // Extra Large (27" 1440p monitors)
				xxl: 1920, // Extra-Extra Large (Full HD / 4K)
				xxxl: 2560, // Ultra Wide / 4K+
			},
		},
	};
};
