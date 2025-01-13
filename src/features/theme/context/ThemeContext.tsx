"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens, Season } from "../theme/theme";

// 1) Define the shape of your context
interface ThemeContextType {
	mode: "light" | "dark";
	toggleTheme: () => void;
	season: Season;
	setSeason: React.Dispatch<React.SetStateAction<Season>>;
}

// 2) Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3) Custom hook for consuming the context
export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

// 4) Helper function to determine the season from the current date
const getSeasonFromDate = (date: Date): Season => {
	const month = date.getMonth();
	if (month >= 2 && month <= 4) {
		return "spring";
	} else if (month >= 5 && month <= 7) {
		return "spring";
	} else if (month >= 8 && month <= 10) {
		return "spring";
	} else {
		return "spring";
	}
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// 5) Respect user/device preference for dark mode
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState<"light" | "dark">(
		prefersDarkMode ? "dark" : "light"
	);

	console.log("mode", mode);

	// 6) Initialize season based on current date
	const initialSeason = getSeasonFromDate(new Date());
	const [season, setSeason] = useState<Season>(initialSeason);

	console.log("season", season);

	// 7) Create a theme based on mode + season
	const theme = useMemo(
		() => createTheme(getDesignTokens(mode, season)),
		[mode, season]
	);

	// 8) Toggle function for light/dark mode
	const toggleTheme = () => {
		setMode((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme, season, setSeason }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
