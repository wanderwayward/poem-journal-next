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
	userId: string; // The original creator's ID for original poems
	username: string; // The original creator's name for original poems
	comment: string;
	public: boolean; // Indicates if the poem is public
	status: "Draft" | "Published"; // User-specific status
	lineCount: number; // New: total count of non-empty lines
	stanzaCount: number; // New: total count of stanzas
}
