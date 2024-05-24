import { Editor, Element as SlateElement } from "slate";

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
  toggleAlignment: (editor: Editor, alignment: "left" | "center" | "right") => {
    const isActive = CustomEditor.isAlignmentActive(editor, alignment);
    if (!isActive) {
      Editor.addMark(editor, "alignment", alignment);
    }
  },
  
  isAlignmentActive: (editor: Editor, alignment: "left" | "center" | "right") => {
    const [match] = Editor.nodes(editor, {
      // This function looks through the nodes in the selection
      match: n => {
        return !Editor.isEditor(n) && SlateElement.isElement(n) && n.alignment === alignment;
      },
      mode: 'all',  // This ensures we check all nodes in the selection
    });
    return !!match;
  },
  
  
};

export default CustomEditor;
