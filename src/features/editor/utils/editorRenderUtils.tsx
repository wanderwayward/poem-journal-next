import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Typography } from "@mui/material";
import EditorStanza from "@/features/editor/components/elements/Stanza";
import EditorLine from "@/features/editor/components/elements/Line";
import EditorParagraph from "@/features/editor/components/elements/Paragraph";

export const DefaultElement = (props: RenderElementProps) => {
	switch (props.element.type) {
		case "stanza":
			return <EditorStanza {...props} />;
		case "line":
			return <EditorLine {...props} />;
		case "paragraph":
			return <EditorParagraph {...props} />;
		default:
			return <EditorStanza {...props} />; // Default to stanza if type is unknown
	}
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
	return (
		<Typography
			{...attributes}
			sx={{
				fontWeight: leaf.bold ? "bold" : "normal",
				fontStyle: leaf.italic ? "italic" : "normal",
				textDecoration: leaf.underline ? "underline" : "none",
				textAlign: leaf.alignment || "left",
				display: "inline", // Display inline to avoid line breaks
			}}
			component="span" // Ensure inline display
		>
			{children}
		</Typography>
	);
};
