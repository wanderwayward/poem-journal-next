import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SoftTextField = (props: TextFieldProps) => {
	const theme = useTheme();

	return (
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
						borderColor: `rgba(229, 159, 178, 0.8)`, // Lighter shade for hover state
					},
					"&.Mui-focused > fieldset": {
						borderColor: `rgba(189, 79, 108, 0.8)`, // Custom color for focused state
					},
				},
			}}
		/>
	);
};
