"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { Descendant, createEditor } from "slate"; // Ensure createEditor is imported
import { CustomElement } from "../_types/Types";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "slate";

interface EditorContextProps {
  content: Descendant[];
  setContent: (content: Descendant[]) => void;
  parsedContent: CustomElement[];
  setParsedContent: (parsedContent: CustomElement[]) => void;
  editor: Editor; // Add editor to the context props
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const initialValue: Descendant[] = [
    {
      type: "stanza",
      id: uuidv4(),
      children: [
        {
          type: "line",
          id: uuidv4(),
          children: [{ text: "First line of the first stanza." }],
        },
        {
          type: "line",
          id: uuidv4(),
          children: [{ text: "Second line of the first stanza." }],
        },
      ],
    },
    {
      type: "stanza",
      id: uuidv4(),
      children: [
        {
          type: "line",
          id: uuidv4(),
          children: [{ text: "First line of the second stanza." }],
        },
      ],
    },
  ];

  const [content, setContent] = useState<Descendant[]>(initialValue);
  const [parsedContent, setParsedContent] = useState<CustomElement[]>([]);
  const editor = createEditor(); // Initialize the editor

  return (
    <EditorContext.Provider
      value={{ content, setContent, parsedContent, setParsedContent, editor }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};
