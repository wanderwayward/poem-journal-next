import React, { useRef, useState } from "react";
import { Paper, useTheme, alpha, Collapse } from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";

const SearchModal = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	// When any element inside the container receives focus
	const handleFocus = () => {
		setIsFocused(true);
	};

	// When focus leaves the container, wait briefly before closing
	const handleBlur = () => {
		setTimeout(() => {
			if (
				containerRef.current &&
				!containerRef.current.contains(document.activeElement)
			) {
				setIsFocused(false);
			}
		}, 100);
	};

	const theme = useTheme();
	const backgroundColor = isFocused
		? alpha(theme.palette.background.paper, 0.9)
		: "transparent";

	return (
		<Paper
			elevation={isFocused ? 4 : 0}
			ref={containerRef}
			tabIndex={0}
			onFocus={handleFocus}
			onBlur={handleBlur}
			sx={{
				position: "relative",
				width: "532px",
				backgroundColor: backgroundColor,
				transition: "height 0.3s ease", // Smooth height transition
			}}
		>
			<SearchBar isFocused={isFocused} />

			{/* Wrap SearchResults inside Collapse */}
			<Collapse in={isFocused} timeout={200}>
				<SearchResults isSearchOpen={isFocused} />
			</Collapse>
		</Paper>
	);
};

export default SearchModal;
