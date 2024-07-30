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
        variant="outlined"
        sx={{
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "2.5em",
          padding: "0.5em",
        }}
      >
        <FormattingButton
          label="B"
          onFormat={() => CustomEditor.toggleBoldMark(editor)}
        />
        <FormattingButton
          label="I"
          onFormat={() => CustomEditor.toggleItalicMark(editor)}
        />
        <FormattingButton
          label="U"
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
      <Box
        sx={{
          padding: "0.1em",
          borderRadius: "4px",
          border: "2px solid transparent",
          transition: "border 0.2s ease-in-out",
          "&:focus-within": {
            border: "2px solid rgba(189, 79, 108, 0.8)",
          },
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          style={{
            height: "15em",
            overflowY: "auto",
            padding: "0.2em",
            borderRadius: "4px",
            outline: "none",
          }}
        />
      </Box>
    </Slate>
  );
};

export default TextEditor;
