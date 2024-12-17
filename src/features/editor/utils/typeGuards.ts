import { CustomElement, Descendant } from "@/features/editor/editorTypes";

export function isCustomElement(
	descendant: Descendant
): descendant is CustomElement {
	return "type" in descendant && "children" in descendant;
}
