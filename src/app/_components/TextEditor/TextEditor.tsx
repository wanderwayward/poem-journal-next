'use client';
import { Sheet, Button } from "@mui/joy";
import { Slate, Editable } from "slate-react";
import CustomEditor from "../../_utils/CustomEditor";
import useEditor from "../../_hooks/useEditor";
import FormattingButton from "./subcomponents/FormattingButton/FormattingButton"
import {useEditorContext} from "../../_contexts/Editor.context";
import parseContentToStanzas from "../../_utils/parseContentToStanzas"

const TextEditor = () => {
  const { editor, renderElement, renderLeaf, onChange, onKeyDown } =
    useEditor();
  const { content, setParsedContent } = useEditorContext();

  const handleSave = () => {
    const parsedContent = parseContentToStanzas(editor.children);
    setParsedContent(parsedContent);
  };

  return (
    <Sheet sx={{ display: "flex", flexDirection: "column", width: "800px" }}>
      <Slate editor={editor} initialValue={content} onChange={onChange}>
        <Sheet
          color="danger"
          variant="solid"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "3em",
          }}
        >
          <FormattingButton
            label="Bold"
            onFormat={() => CustomEditor.toggleBoldMark(editor)}
          />
          <FormattingButton
            label="Italic"
            onFormat={() => CustomEditor.toggleItalicMark(editor)}
          />
          <FormattingButton
            label="Underline"
            onFormat={() => CustomEditor.toggleUnderlineMark(editor)}
          />
          <FormattingButton
            label="Align Left"
            onFormat={() => CustomEditor.toggleAlignment(editor, "left")}
          />
          <FormattingButton
            label="Align Center"
            onFormat={() => CustomEditor.toggleAlignment(editor, "center")}
          />
          <FormattingButton
            label="Align Right"
            onFormat={() => CustomEditor.toggleAlignment(editor, "right")}
          />

          <Button onClick={handleSave} variant="solid">
            save
          </Button>
        </Sheet>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </Sheet>
  );
};

export default TextEditor;
