import { CustomElement, Descendant } from "@/editor/Types";

export function isCustomElement(
	descendant: Descendant
): descendant is CustomElement {
	return "type" in descendant && "children" in descendant;
}
