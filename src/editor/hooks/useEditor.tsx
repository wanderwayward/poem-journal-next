"use client";
import { useCallback, useState } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import CustomEditor from "@/editor/utils/CustomEditor";
import { DefaultElement, Leaf } from "@/editor/utils/editorRenderUtils";
import { useEditorContext } from "@/editor/contexts/EditorContext";
import parseContentToStanzas from "@/editor/utils/parseContentToStanzas";

const useEditor = () => {
	const [editor] = useState(() => withReact(createEditor()));
	const { setContent, setParsedContent } = useEditorContext();

	const renderElement = useCallback(
		(props: RenderElementProps) => <DefaultElement {...props} />,
		[]
	);
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	const onChange = useCallback(
		(value: any) => {
			setContent(value);
			const isAstChange = editor.operations.some(
				(op) => op.type !== "set_selection"
			);
			if (isAstChange) {
				// Parse content and update parsedContent state
				const parsedContent = parseContentToStanzas(value);
				setParsedContent(parsedContent);
			}
		},
		[editor, setContent, setParsedContent]
	);

	const onKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (!event.ctrlKey) {
				return;
			}
			switch (event.key) {
				case "b": {
					event.preventDefault();
					CustomEditor.toggleBoldMark(editor);
					break;
				}
				case "i": {
					event.preventDefault();
					CustomEditor.toggleItalicMark(editor);
					break;
				}
				case "u": {
					event.preventDefault();
					CustomEditor.toggleUnderlineMark(editor);
					break;
				}
				case "l": {
					event.preventDefault();
					console.log("toggleAlignment");
					CustomEditor.toggleAlignment(editor, "left");
					break;
				}
				case "e": {
					event.preventDefault();
					console.log("toggleAlignment");
					CustomEditor.toggleAlignment(editor, "center");
					break;
				}
				case "r": {
					event.preventDefault();
					console.log("toggleAlignment");
					CustomEditor.toggleAlignment(editor, "right");
					break;
				}
				// Add more cases as needed for new functionalities
			}
		},
		[editor]
	);

	return { editor, renderElement, renderLeaf, onChange, onKeyDown };
};

export default useEditor;
