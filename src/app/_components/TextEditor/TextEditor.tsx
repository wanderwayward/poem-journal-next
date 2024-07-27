"use client";
import { Paper, Box } from "@mui/material";
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
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "3em",
          marginTop: "1em",
          boxShadow: "1px 2px 1px rgba(0, 0, 0, 0.1)",
          padding: "0.5em",
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
      </Paper>
      <Paper variant="outlined" sx={{ mt: 2, p: 1 }}>
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
      </Paper>
    </Slate>
  );
};

export default TextEditor;
