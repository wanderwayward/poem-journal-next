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
        color="success"
        variant="soft"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "3em",
          marginTop: "1em",
          boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.1)",
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
      <Sheet variant="soft" color="neutral" invertedColors>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          style={{
            height: "300px", // You can adjust this height as needed
            overflowY: "auto",
            padding: "1em",
            borderRadius: "4px",
            boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Sheet>
    </Slate>
  );
};

export default TextEditor;
