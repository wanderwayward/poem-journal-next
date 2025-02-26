import React, { useRef, useState, useCallback } from "react";
import { Paper, useTheme, alpha, Collapse } from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import { PoemType } from "@/features/poem/poemTypes";
import { debounce } from "lodash";

const SearchModal = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [searchResults, setSearchResults] = useState<PoemType[]>([]);

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

	const fetchPoems = async (searchQuery: string) => {
		if (!searchQuery.trim()) return setSearchResults([]); // Clear if empty

		try {
			const response = await fetch(
				`/api/poems/search?q=${encodeURIComponent(searchQuery)}`
			);
			const result = await response.json();
			setSearchResults(result.data || []);
		} catch (error) {
			console.error("Search error:", error);
			setSearchResults([]); // Fallback in case of error
		}
	};

	// Debounce the search to prevent excessive API calls
	const debouncedFetchPoems = useCallback(debounce(fetchPoems, 300), []);

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
			<SearchBar isFocused={isFocused} handleSearch={debouncedFetchPoems} />

			{/* Wrap SearchResults inside Collapse */}
			<Collapse in={isFocused} timeout={200}>
				<SearchResults isSearchOpen={isFocused} searchResults={searchResults} />
			</Collapse>
		</Paper>
	);
};

export default SearchModal;
