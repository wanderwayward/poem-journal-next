import { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface ThemedProps {
	theme: Theme;
}

export const SoftTextField = ({
	theme,
	...props
}: TextFieldProps & ThemedProps) => (
	<TextField
		{...props}
		variant="outlined"
		sx={{
			"& .MuiInputBase-root": {
				backgroundColor:
					theme.palette.mode === "light"
						? theme.palette.secondary.light
						: theme.palette.primary.dark,
				borderRadius: "4px",
			},
			"& .MuiOutlinedInput-root": {
				"& > fieldset": {
					borderColor: "transparent",
					transition: "border-color 0.3s",
				},
				"&:hover > fieldset": {
					borderColor: `rgba(229, 159, 178, 0.8)`,
				},
				"&.Mui-focused > fieldset": {
					borderColor: `rgba(189, 79, 108, 0.8)`,
				},
			},
		}}
	/>
);

export const SearchField = ({
	theme,
	...props
}: TextFieldProps & ThemedProps) => {
	const [focused, setFocused] = useState(false);

	return (
		<TextField
			{...props}
			variant="outlined"
			placeholder={!focused ? "Search" : ""}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			sx={{
				backgroundColor: focused ? "white" : "transparent",
				border: "none",
				borderRadius: "4px",
				outline: "none",
				paddingY: "2px",
				minHeight: "unset",
				transition:
					"background-color 0.2s ease-in-out, border 0.2s ease-in-out",
				"&:hover": {
					border: "1px solid black",
				},
				"& .MuiInputBase-root": {
					backgroundColor: "transparent",
					borderRadius: 0,
					paddingY: "2px",
					fontSize: "1rem",
				},
				"& .MuiInput-underline:before, & .MuiInput-underline:after": {
					display: "none",
				},
				"& .MuiInputBase-input": {
					color: theme.palette.text.primary,
					textAlign: "center",
				},
			}}
		/>
	);
};
