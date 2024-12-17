import React from "react";
import { Typography } from "@mui/material";
import {
	PoemLineType,
	PoemCustomText,
} from "@/features/editor/types/editorTypes";

interface LineProps {
	line: PoemLineType;
}

const Line: React.FC<LineProps> = ({ line }) => {
	return (
		<Typography
			component="div"
			sx={{
				textAlign: line.alignment || "left",
				whiteSpace: "pre-wrap",
			}}
		>
			{line.children.map((textNode: PoemCustomText, index: number) => (
				<span
					key={index}
					style={{
						fontWeight: textNode.bold ? "bold" : "normal",
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
