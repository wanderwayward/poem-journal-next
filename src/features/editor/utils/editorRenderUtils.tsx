import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Typography } from "@mui/material";
import EditorStanza from "@/features/editor/components/elements/Stanza";
import EditorLine from "@/features/editor/components/elements/Line";
import EditorParagraph from "@/features/editor/components/elements/Paragraph";
import { Poiret_One, Lora } from "next/font/google";

const poiretOne = Poiret_One({
	weight: "400",
	subsets: ["latin"],
});

const lora = Lora({
	weight: "400",
	subsets: ["latin"],
});

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
				fontFamily: `${lora.style.fontFamily}, serif`,
				fontWeight: leaf.bold ? 700 : 400,
				fontStyle: leaf.italic ? "italic" : "normal",
				textDecoration: leaf.underline ? "underline" : "none",
				textAlign: leaf.alignment || "left",
				display: "inline",
			}}
			component="span"
		>
			{children}
		</Typography>
	);
};
