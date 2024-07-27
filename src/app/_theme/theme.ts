export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#c7e0f7",
            main: "#b0c4de",
            dark: "#95a3c2",
            contrastText: "#000",
          },
          secondary: {
            light: "#efcfe7",
            main: "#d9aad0",
            dark: "#b78bb5",
            contrastText: "#000",
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
            default: "#fafafa",
            paper: "#ffffff",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
            disabled: "rgba(0, 0, 0, 0.38)",
          },
          divider: "rgba(0, 0, 0, 0.12)",
        }
      : {
          primary: {
            light: "#c7e0f7",
            main: "#b0c4de",
            dark: "#95a3c2",
            contrastText: "#fff",
          },
          secondary: {
            light: "#efcfe7",
            main: "#d9aad0",
            dark: "#b78bb5",
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
            paper: "#1e1e1e",
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
