"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens } from "../theme/theme";

// Define the shape of your context state
interface ThemeContextType {
	toggleTheme: () => void;
	mode: "light" | "dark";
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState<"light" | "dark">(
		prefersDarkMode ? "dark" : "light"
	);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	const toggleTheme = () => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
