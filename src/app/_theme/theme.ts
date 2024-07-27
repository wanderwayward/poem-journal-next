export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#a1c9f1",
            main: "#90a4d4",
            dark: "#7189bf",
            contrastText: "#000",
          },
          secondary: {
            light: "#e0addc",
            main: "#c48ecf",
            dark: "#a46fb3",
            contrastText: "#000",
          },
          error: {
            light: "#f4a6a6",
            main: "#d97d7d",
            dark: "#c75b5b",
            contrastText: "#fff",
          },
          warning: {
            light: "#ffcf80",
            main: "#f4a85c",
            dark: "#e69135",
            contrastText: "#000",
          },
          info: {
            light: "#80d4f4",
            main: "#68b0d1",
            dark: "#4c8fba",
            contrastText: "#fff",
          },
          success: {
            light: "#a1e4a6",
            main: "#81c785",
            dark: "#5fa26b",
            contrastText: "#fff",
          },
          background: {
            default: "#f5f5f5",
            paper: "#fff",
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
            light: "#a1c9f1",
            main: "#90a4d4",
            dark: "#7189bf",
            contrastText: "#fff",
          },
          secondary: {
            light: "#e0addc",
            main: "#c48ecf",
            dark: "#a46fb3",
            contrastText: "#fff",
          },
          error: {
            light: "#f4a6a6",
            main: "#d97d7d",
            dark: "#c75b5b",
            contrastText: "#fff",
          },
          warning: {
            light: "#ffcf80",
            main: "#f4a85c",
            dark: "#e69135",
            contrastText: "#fff",
          },
          info: {
            light: "#80d4f4",
            main: "#68b0d1",
            dark: "#4c8fba",
            contrastText: "#fff",
          },
          success: {
            light: "#a1e4a6",
            main: "#81c785",
            dark: "#5fa26b",
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
