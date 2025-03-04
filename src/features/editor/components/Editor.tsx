"use client";
import { useState, FC } from "react";
import {
	Paper,
	Box,
	IconButton,
	Dialog,
	DialogContent,
	Button,
} from "@mui/material";
import { Slate, Editable } from "slate-react";
import { LuExpand } from "react-icons/lu";
import useEditor from "@/features/editor/hooks/useEditor";
import CustomEditor from "@/features/editor/utils/CustomEditor";
import FormattingButton from "@/features/editor/components/controls/FormattingButton";
import { useEditorContext } from "@/features/editor/context/EditorContext";
import { useTheme } from "@mui/material/styles";

const TextEditor = () => {
	const { editor, renderElement, renderLeaf, onChange, onKeyDown } =
		useEditor();
	const { content, setContent } = useEditorContext();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => setIsModalOpen(false);

	const theme = useTheme();

	return (
		<>
			<Slate
				editor={editor}
				initialValue={content}
				onChange={(value) => {
					onChange(value);
					setContent(value); // Ensure state synchronization
				}}
			>
				<Paper
					variant="outlined"
					sx={{
						border: "none",
						display: "flex",
						textAlign: "center",
						justifyContent: "space-around",
						alignItems: "center",
						height: "2.5em",
						padding: "0.1em",
					}}
				>
					<FormattingButton
						label="B"
						onFormat={() => CustomEditor.toggleBoldMark(editor)}
					/>
					<FormattingButton
						label="I"
						onFormat={() => CustomEditor.toggleItalicMark(editor)}
					/>
					<FormattingButton
						label="U"
						onFormat={() => CustomEditor.toggleUnderlineMark(editor)}
					/>
					<FormattingButton
						label="Align Left"
						onFormat={() => CustomEditor.toggleAlignment(editor, "left")}
					/>
					<FormattingButton
						label="Align Center"
						onFormat={() => CustomEditor.toggleAlignment(editor, "center")}
					/>
					<FormattingButton
						label="Align Right"
						onFormat={() => CustomEditor.toggleAlignment(editor, "right")}
					/>
				</Paper>
				<Box
					className="scroll-wrapper"
					sx={{
						width: "25rem",
						bgcolor:
							theme.palette.mode === "light"
								? "secondary.light"
								: "primary.dark",
						position: "relative",
						padding: "0.1em",
						borderRadius: "4px",
						border: "2px solid transparent",
						transition: "border 0.2s ease-in-out",
						"&:focus-within": {
							border: "2px solid rgba(189, 79, 108, 0.8)",
						},
						"&:hover": {
							border: "2px solid rgba(229, 159, 178, 0.8)",
						},
						"&:hover .expand-icon": {
							display: "flex",
						},
						".expand-icon": {
							transition: "transform 0.2s ease-in-out",
							transform: "scale(1)",
						},
					}}
				>
					<Box
						className="scroll-content"
						sx={{
							overflowY: "auto",
							height: "35em",
							width: "100%",
							paddingLeft: "0.4em",
							paddingRight: "0.4em",
							borderRadius: "4px",
						}}
					>
						<Editable
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							onKeyDown={onKeyDown}
							style={{
								minHeight: "100%",
								outline: "none",
							}}
						/>
					</Box>
					<IconButton
						className="expand-icon"
						onClick={handleModalOpen}
						sx={{
							display: "none",
							position: "absolute",
							bottom: 8,
							right: 8,
							border: null,
							color: "rgba(189, 79, 108, 0.8)",
						}}
					>
						<LuExpand />
					</IconButton>
				</Box>
			</Slate>

			<Dialog
				open={isModalOpen}
				onClose={handleModalClose}
				maxWidth="lg"
				fullWidth
			>
				<DialogContent
					sx={{
						height: "70vh",
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						pb: 1,
					}}
				>
					{isModalOpen && (
						<Slate
							editor={editor}
							initialValue={content}
							onChange={(value) => {
								onChange(value);
								setContent(value);
							}}
						>
							<Paper
								variant="outlined"
								sx={{
									border: "none",
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center",
									height: "2.5em",
									padding: "0.5em",
									mb: "0.3em",
									position: "sticky",
									zIndex: 1,
								}}
							>
								<FormattingButton
									label="B"
									onFormat={() => CustomEditor.toggleBoldMark(editor)}
								/>
								<FormattingButton
									label="I"
									onFormat={() => CustomEditor.toggleItalicMark(editor)}
								/>
								<FormattingButton
									label="U"
									onFormat={() => CustomEditor.toggleUnderlineMark(editor)}
								/>
								<FormattingButton
									label="Align Left"
									onFormat={() => CustomEditor.toggleAlignment(editor, "left")}
								/>
								<FormattingButton
									label="Align Center"
									onFormat={() =>
										CustomEditor.toggleAlignment(editor, "center")
									}
								/>
								<FormattingButton
									label="Align Right"
									onFormat={() => CustomEditor.toggleAlignment(editor, "right")}
								/>
							</Paper>
							<Box
								sx={{
									flex: 1, // Allow the box to grow to fill available space
									overflowY: "auto", // Make the content scrollable
									padding: "0.1em",
									borderRadius: "4px",
									border: "2px solid rgba(189, 79, 108, 0.8)",
								}}
							>
								<Editable
									renderElement={renderElement}
									renderLeaf={renderLeaf}
									onKeyDown={onKeyDown}
									style={{
										minHeight: "100%",
										padding: "1em",
										borderRadius: "4px",
										outline: "none",
									}}
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									mt: 1,
								}}
							>
								<Button variant="contained" onClick={handleModalClose}>
									Close
								</Button>
							</Box>
						</Slate>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TextEditor;
