export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#e2ece9ff", // Mint Cream
            main: "#cddafdff", // Periwinkle (softened)
            dark: "#7f9172ff", // Reseda Green (muted)
            contrastText: "#2d2a32ff", // Raisin Black
          },
          secondary: {
            light: "#fde2e4ff", // Misty Rose
            main: "#fff1e6ff", // Linen
            dark: "#bd4f6cff", // Fuchsia Rose (softened)
            contrastText: "#2d2a32ff", // Raisin Black
          },
          error: {
            light: "#f7c3c3",
            main: "#e0a4a4",
            dark: "#c18383",
            contrastText: "#fff",
          },
          warning: {
            light: "#ffe3a1",
            main: "#f7c684",
            dark: "#e0a56e",
            contrastText: "#000",
          },
          info: {
            light: "#b3e3f7",
            main: "#99cde0",
            dark: "#7fb1c2",
            contrastText: "#fff",
          },
          success: {
            light: "#cdebcf",
            main: "#a8d4aa",
            dark: "#87b286",
            contrastText: "#fff",
          },
          background: {
            default: "#f3f3f3", // Slightly warmer than #fafafa
            paper: "#ffffff",
          },
          text: {
            primary: "#2d2a32ff", // Raisin Black
            secondary: "rgba(45, 42, 50, 0.6)", // Raisin Black with transparency
            disabled: "rgba(45, 42, 50, 0.38)",
          },
          divider: "rgba(45, 42, 50, 0.12)",
        }
      : {
          primary: {
            light: "#95a3c2", // Muted Blue-Grey
            main: "#7f9172ff", // Reseda Green
            dark: "#3d0814ff", // Chocolate Cosmos
            contrastText: "#fff",
          },
          secondary: {
            light: "#cddafdff", // Periwinkle
            main: "#fff1e6ff", // Linen
            dark: "#bd4f6cff", // Fuchsia Rose
            contrastText: "#fff",
          },
          error: {
            light: "#f7c3c3",
            main: "#e0a4a4",
            dark: "#c18383",
            contrastText: "#fff",
          },
          warning: {
            light: "#ffe3a1",
            main: "#f7c684",
            dark: "#e0a56e",
            contrastText: "#fff",
          },
          info: {
            light: "#b3e3f7",
            main: "#99cde0",
            dark: "#7fb1c2",
            contrastText: "#fff",
          },
          success: {
            light: "#cdebcf",
            main: "#a8d4aa",
            dark: "#87b286",
            contrastText: "#fff",
          },
          background: {
            default: "#1e1e1e",
            paper: "#2d2a32ff", // Raisin Black
          },
          text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
          },
          divider: "rgba(255, 255, 255, 0.12)",
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
      xxxl: 2560,
    },
  },
});
