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

export interface PoemType {
	_id: string;
	title: string;
	author: string;
	tags: string[];
	stanzas: PoemStanzaType[];
	userId: string;
	username: string;
	comment: string;
	public: boolean;
	status: "Draft" | "Published";
	lineCount: number;
	stanzaCount: number;
	pageCount: number;
	averageLineLength: number;
	longLines: boolean;
}
