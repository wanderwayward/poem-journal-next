import { useState, useEffect } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { SearchField } from "@/features/shared/components/CustomComponents/CustomComponents";

interface SearchBarProps {
	isFocused?: boolean;
}

const placeholders = [
	"Search for a poem...",
	"Find inspiration...",
	"Discover new verses...",
	"Explore poetic themes...",
	"Uncover hidden gems...",
];

const SearchBar = ({ isFocused = false }: SearchBarProps) => {
	const [displayText, setDisplayText] = useState("");
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const theme = useTheme();

	useEffect(() => {
		let interval: NodeJS.Timeout;
		const typeText = () => {
			interval = setInterval(() => {
				const currentPlaceholder = placeholders[placeholderIndex];

				if (!isDeleting) {
					// Typing animation
					setDisplayText((prev) =>
						currentPlaceholder.substring(0, prev.length + 1)
					);

					if (displayText.length === currentPlaceholder.length) {
						clearInterval(interval);
						setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
					}
				} else {
					// Deleting animation
					setDisplayText((prev) => prev.substring(0, prev.length - 1));

					if (displayText.length === 0) {
						clearInterval(interval);
						setIsDeleting(false);
						setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
					}
				}
			}, 100); // Speed of animation
		};

		typeText();
		return () => clearInterval(interval);
	}, [displayText, isDeleting, placeholderIndex]);

	return (
		<Box
			component="div"
			sx={{
				p: ".5rem",
				pl: isFocused ? ".5rem" : 0,
				transition: "padding-left 0.3s",
				pb: 0,
			}}
		>
			<SearchField
				displayText={displayText}
				theme={theme}
				expanded={isFocused}
				autoComplete="off"
			/>
			{isFocused && (
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ textAlign: "right", p: 0, m: 0 }}
				>
					advanced search
				</Typography>
			)}
		</Box>
	);
};

export default SearchBar;
