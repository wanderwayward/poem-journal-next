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
    const marks = Editor.marks(editor) as Record<string, any> | undefined;
    if (marks) {
      const currentAlignment = marks.alignment;
      if (currentAlignment === alignment) {
        // If the current alignment is the same as the new alignment, remove it
        Editor.removeMark(editor, "alignment");
      } else {
        // Otherwise, set the new alignment
        Editor.addMark(editor, "alignment", alignment);
      }
    } else {
      // If there are no alignment marks, add the new alignment
      Editor.addMark(editor, "alignment", alignment);
    }
  },
  isAlignmentActive: (editor: Editor, alignment: Alignment) => {
    const marks = Editor.marks(editor) as Record<string, any> | undefined;
    return marks ? marks.alignment === alignment : false;
  },
};

export default CustomEditor;
