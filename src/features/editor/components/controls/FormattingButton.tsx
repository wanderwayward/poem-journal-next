import React from "react";
import { Button } from "@mui/material";
import {
	FormatAlignLeft,
	FormatAlignCenter,
	FormatAlignRight,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface FormattingButtonProps {
	label: string;
	onFormat: () => void;
}

const FormattingButton: React.FC<FormattingButtonProps> = ({
	label,
	onFormat,
}) => {
	// Function to render the appropriate icon or text based on the label
	const renderLabel = (label: string) => {
		switch (label) {
			case "Align Left":
				return <FormatAlignLeft sx={{ fontSize: "1rem" }} />;
			case "Align Center":
				return <FormatAlignCenter sx={{ fontSize: "1rem" }} />;
			case "Align Right":
				return <FormatAlignRight sx={{ fontSize: "1rem" }} />;
			default:
				return label;
		}
	};

	const theme = useTheme();

	return (
		<Button
			variant="contained"
			onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				onFormat();
			}}
			sx={{
				maxHeight: "2em",
				mx: ".1em",
				backgroundColor: theme.palette.error.main,
			}}
		>
			{renderLabel(label)}
		</Button>
	);
};

export default FormattingButton;
