import { BreakpointOverrides } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xxl: true;
		xxxl: true;
	}
}

declare module "@mui/material/styles" {
	interface Palette {
		neutral: Palette["primary"];
	}
	interface PaletteOptions {
		neutral?: PaletteOptions["primary"];
	}
}
