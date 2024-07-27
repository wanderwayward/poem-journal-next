"use client";

// src/app/_theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Extend Material-UI's default breakpoints to include custom values
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // keeping existing breakpoints
    sm: true; // keeping existing breakpoints
    md: true; // keeping existing breakpoints
    lg: true; // keeping existing breakpoints
    xl: true; // keeping existing breakpoints
    xxl: true; // custom breakpoint
    xxxl: true; // custom breakpoint
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920, // Custom breakpoint
      xxxl: 2560, // Custom breakpoint
    },
  },
  // Add other customizations here, such as palette, typography, etc.
});

export default theme;
