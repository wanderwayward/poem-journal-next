import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomElement = {
  type: "stanza" | "line" | "paragraph";
  children: Descendant[];
  id?: string;
  alignment?: "left" | "center" | "right";
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  alignment?: "left" | "center" | "right" | null;
};

export type Descendant = CustomElement | CustomText;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type Alignment = "left" | "center" | "right";

export interface PoemCustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface PoemLineType {
  id: string;
  type: string;
  children: PoemCustomText[];
  alignment?: "left" | "center" | "right" | null;
}

export interface PoemStanzaType {
  id: string;
  type: string;
  children: PoemLineType[];
}

// export interface PoemType {
//   _id: string;
//   title: string;
//   author: string;
//   tags: string[];
//   stanzas: PoemStanzaType[];
//   status: string;
//   userId: string;
//   username: string;
//   comment: string;
// }

export interface PoemType {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  stanzas: PoemStanzaType[];
  userId: string; // The original creator's ID for original poems
  username: string; // The original creator's name for original poems
  comment: string;
  type: "original" | "non-original";
  public: boolean; // Indicates if the poem is public
  status: "draft" | "published"; // User-specific status
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface AnnotationType {
  _id: string;
  userId: string;
  poemId: string;
  selectedText: string;
  startLineId: string;
  endLineId: string;
  startCharIndex: number;
  endCharIndex: number;
  comment: string;
  memory: string;
  imageUrl?: string;
  createdAt: Date;
}
