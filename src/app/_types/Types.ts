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
};

export type Descendant = CustomElement | CustomText;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
