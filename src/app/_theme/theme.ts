// src/app/_theme/theme.ts
import { extendTheme } from "@mui/joy/styles";

// Extending the theme interface to include custom breakpoints
declare module "@mui/joy/styles" {
  interface Breakpoints {
    values: {
      xxl: number;
      xxxl: number;
    };
  }
}

const theme = extendTheme({
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
  // Add other customizations here
});

export default theme;
