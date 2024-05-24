import { Editor, Element as SlateElement, Transforms } from "slate";
import { Alignment } from "../_types/Types"; // Adjust the import path as necessary

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
    const isActive = CustomEditor.isAlignmentActive(editor, alignment);
    // Remove all existing alignment marks
    Editor.removeMark(editor, "left");
    Editor.removeMark(editor, "center");
    Editor.removeMark(editor, "right");
    // Add new alignment mark if not already active
    if (!isActive) {
      Editor.addMark(editor, alignment, true);
    }
  },
  isAlignmentActive: (editor: Editor, alignment: Alignment) => {
    const marks = Editor.marks(editor) as Record<Alignment, boolean> | undefined;
    return marks ? (marks[alignment] === true) : false;
  },
};

export default CustomEditor;
