import { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";

interface ThemedProps {
	theme: Theme;
}

interface HoverableCircleProps {
	fill: string;
}

type SearchFieldProps = TextFieldProps &
	ThemedProps & {
		displayText?: string;
		expanded?: boolean;
		defaultWidth?: string;
		expandedWidth?: string;
	};

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
	displayText = "Search",
	expanded = false,
	defaultWidth = "300px",
	expandedWidth = "516px",
	...props
}: SearchFieldProps) => {
	const [focused, setFocused] = useState(false);
	const shouldExpand = focused || expanded;

	return (
		<TextField
			{...props}
			variant="outlined"
			placeholder={!focused ? displayText : ""}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			slotProps={{
				input: {
					sx: {
						height: "2.2rem",
						width: shouldExpand ? expandedWidth : defaultWidth,
						transition: "width 0.3s ease",
						alignItems: "center",
						paddingY: "4px",
						borderRadius: "4px",
						backgroundColor: "transparent",
						fontSize: "1.4rem",
						border: "none",
					},
					startAdornment: (
						<Search
							sx={{
								fontSize: "2rem",
								mr: 1,
								ml: -1,
								color: theme.palette.error.dark,
							}}
						/>
					),
				},
			}}
			sx={{
				height: "2.2rem",
				backgroundColor: focused ? "white" : "transparent",
				borderRadius: "4px",
				border: "none",
				outline: "none",
				minHeight: "unset",
				transition: "background-color 0.2s ease-in-out",
				"& .MuiOutlinedInput-notchedOutline": {
					border: "none",
				},
			}}
		/>
	);
};

export const HoverableCircle = ({ fill }: HoverableCircleProps) => {
	return (
		<svg width="12" height="12" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="6" style={{ fill }} />
		</svg>
	);
};
