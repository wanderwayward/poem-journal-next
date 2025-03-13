import React from "react";
import { Typography, useTheme } from "@mui/material";
import { PoemLineType, PoemCustomText } from "@/features/poem/poemTypes";

interface LineProps {
	line: PoemLineType;
}

const Line: React.FC<LineProps> = ({ line }) => {
	const theme = useTheme();
	return (
		<Typography
			component="div"
			sx={{
				color: theme.palette.primary.contrastText,
				lineHeight: 1.2,
				fontSize: "1.1rem",
				textAlign: line.alignment || "left",
				whiteSpace: "pre-wrap",
				// fontFamily: "merriweather",
				// fontFamily: "lora",
				fontFamily: "josefinSans",
				// fontFamily: "raleway",
				// fontFamily: "dmSans",
				// fontFamily: "quattrocento",
			}}
		>
			{line.children.map((textNode: PoemCustomText, index: number) => (
				<span
					key={index}
					style={{
						fontWeight: textNode.bold ? "600" : "100",
						fontStyle: textNode.italic ? "italic" : "normal",
						textDecoration: textNode.underline ? "underline" : "none",
						whiteSpace: "pre-wrap",
					}}
				>
					{textNode.text}
				</span>
			))}
		</Typography>
	);
};

export default Line;
