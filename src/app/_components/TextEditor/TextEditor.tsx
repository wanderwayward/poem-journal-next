"use client";
import { Sheet } from "@mui/joy";
import { Slate, Editable } from "slate-react";
import CustomEditor from "../../_utils/CustomEditor";
import useEditor from "../../_hooks/useEditor";
import FormattingButton from "./subcomponents/FormattingButton/FormattingButton";
import { useEditorContext } from "../../_contexts/Editor.context";

const TextEditor = () => {
  const { editor, renderElement, renderLeaf, onChange, onKeyDown } =
    useEditor();
  const { content, setContent } = useEditorContext();

  return (
    <Slate
      editor={editor}
      initialValue={content}
      onChange={(value) => setContent(value)}
    >
      <Sheet
        color="danger"
        variant="solid"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "3em",
          marginTop: "1em",
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
      </Sheet>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

export default TextEditor;
