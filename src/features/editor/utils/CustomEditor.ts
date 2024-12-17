import { Editor, Element as SlateElement, Transforms } from "slate";
import { Alignment } from "@/features/editor/Types"; // Adjust the import path as necessary

const CustomEditor = {
	isBoldMarkActive: (editor: Editor) => {
		const marks = Editor.marks(editor);
		return marks ? marks.bold === true : false;
	},
	toggleBoldMark: (editor: Editor) => {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "bold");
		} else {
			Editor.addMark(editor, "bold", true);
		}
	},
	isItalicMarkActive: (editor: Editor) => {
		const marks = Editor.marks(editor);
		return marks ? marks.italic === true : false;
	},
	toggleItalicMark: (editor: Editor) => {
		const isActive = CustomEditor.isItalicMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "italic");
		} else {
			Editor.addMark(editor, "italic", true);
		}
	},
	isUnderlineMarkActive: (editor: Editor) => {
		const marks = Editor.marks(editor);
		return marks ? marks.underline === true : false;
	},
	toggleUnderlineMark: (editor: Editor) => {
		const isActive = CustomEditor.isUnderlineMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "underline");
		} else {
			Editor.addMark(editor, "underline", true);
		}
	},
	toggleAlignment: (editor: Editor, alignment: Alignment) => {
		const { selection } = editor;
		if (!selection) return;

		const isActive = CustomEditor.isAlignmentActive(editor, alignment);
		Transforms.setNodes(
			editor,
			{ alignment: isActive ? null : alignment },
			{
				match: (n) =>
					!Editor.isEditor(n) &&
					SlateElement.isElement(n) &&
					(n.type === "stanza" || n.type === "line" || n.type === "paragraph"),
			}
		);
	},
	isAlignmentActive: (editor: Editor, alignment: Alignment) => {
		const marks = Editor.marks(editor) as Record<string, any> | undefined;
		return marks ? marks.alignment === alignment : false;
	},
};

export default CustomEditor;
