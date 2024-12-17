export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#babd8dff", // Sage
            main: "#7c6a0aff", // Olive
            dark: "#5a2a27ff", // Caput Mortuum
            contrastText: "#264653ff", // Charcoal
          },
          secondary: {
            light: "#eabfcbff", // Fairy Tale
            main: "#cd8987ff", // Old Rose
            dark: "#9c3848ff", // Cordovan
            contrastText: "#264653ff", // Charcoal
          },
          error: {
            light: "#e8a09eff", // Derived light shade
            main: "#d47472ff", // Derived main shade
            dark: "#ab4540ff", // Derived dark shade
            contrastText: "#E9ECF5", // Light Gray
          },
          warning: {
            light: "#ffdac6ff", // Apricot
            main: "#fcbf49ff", // Xanthous
            dark: "#fa9500ff", // Princeton Orange
            contrastText: "#000000", // Black
          },
          info: {
            light: "#b0d0d3ff", // Light Blue
            main: "#388659ff", // Sea Green
            dark: "#003e1fff", // British Racing Green
            contrastText: "#E9ECF5", // Light Gray
          },
          success: {
            light: "#cdebcfff", // Derived light shade
            main: "#a8d4aaff", // Derived main shade
            dark: "#87b286ff", // Derived dark shade
            contrastText: "#E9ECF5", // Light Gray
          },
          neutral: {
            light: "#f0e5d8ff", // A very light beige
            main: "#e9e4e1ff", // Light warm gray
            dark: "#e9ecf5ff", // Very light gray, close to white
            contrastText: "#264653ff", // Charcoal
          },
          background: {
            default: "#E9ECF5", // Light Gray
            paper: "#E9ECF5", // White
          },
          text: {
            primary: "#264653ff", // Charcoal
            secondary: "rgba(38, 70, 83, 0.7)", // Charcoal with transparency
            disabled: "rgba(38, 70, 83, 0.5)", // Charcoal with transparency
          },
          divider: "rgba(38, 70, 83, 0.12)", // Charcoal with transparency
        }
      : {
          primary: {
            light: "#a1a69eff", // Derived light shade from Sage
            main: "#003e1fff", // British Racing Green
            dark: "#1b3a31ff", // Derived dark shade from British Racing Green
            contrastText: "#E9ECF5", // Light Gray
          },
          secondary: {
            light: "#e8b0a1ff", // Derived light shade from Old Rose
            main: "#9c3848ff", // Cordovan
            dark: "#74121dff", // Burgundy
            contrastText: "#E9ECF5", // Light Gray
          },
          error: {
            light: "#eabfcbff", // Fairy Tale
            main: "#cd8987ff", // Old Rose
            dark: "#9c3848ff", // Cordovan
            contrastText: "#E9ECF5", // Light Gray
          },
          warning: {
            light: "#e6c5a5ff", // Derived light shade (muted apricot)
            main: "#e69500ff", // Derived main shade (burnt orange)
            dark: "#cc7a00ff", // Derived dark shade (deep burnt orange)
            contrastText: "#E9ECF5", // Light Gray
          },
          info: {
            light: "#8fb2c3ff", // Derived light shade from Light Blue
            main: "#2b5b5fff", // Derived main shade from Sea Green
            dark: "#002f33ff", // Derived dark shade from British Racing Green
            contrastText: "#E9ECF5", // Light Gray
          },
          success: {
            light: "#b5c2b2ff", // Derived light shade from Olive
            main: "#4a6040ff", // Derived main shade from Olive
            dark: "#2f3c2bff", // Derived dark shade from Olive
            contrastText: "#E9ECF5", // Light Gray
          },
          neutral: {
            light: "#707974ff", // Light Gray with a hint of green
            main: "#545d58ff", // Medium Gray with a subtle green undertone
            dark: "#3a413cff", // Dark Gray with a faint green hue
            contrastText: "#e9ecf5ff", // Light Gray
          },
          background: {
            default: "#0b2027ff", // Rich Black
            paper: "#264653ff", // Charcoal
          },
          text: {
            primary: "#E9ECF5", // Light Gray
            secondary: "rgba(233, 236, 245, 0.7)", // Light Gray with transparency
            disabled: "rgba(233, 236, 245, 0.5)", // Light Gray with transparency
          },
          divider: "rgba(233, 236, 245, 0.12)", // Light Gray with transparency
        }),
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
  },
});
