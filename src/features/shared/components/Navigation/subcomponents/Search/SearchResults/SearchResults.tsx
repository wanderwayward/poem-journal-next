import { Box, Typography } from "@mui/material";
import { PoemType } from "@/features/poem/poemTypes";
import SearchResult from "../SearchResult/SearchResult";

interface SearchResultsProps {
	isSearchOpen: boolean;
	searchResults: PoemType[];
}

const SearchResults = ({ isSearchOpen, searchResults }: SearchResultsProps) => {
	if (!isSearchOpen) return null;

	return (
		<Box
			sx={{
				width: "100%", // Ensures it takes up the full width of the parent Paper
				p: "1px",
				m: 0,
			}}
		>
			{searchResults.map((result) => (
				<SearchResult key={result._id} poem={result} />
			))}

			<Box>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ textAlign: "right", cursor: "pointer", pr: "0.5rem" }}
				>
					more results
				</Typography>
			</Box>
		</Box>
	);
};

export default SearchResults;
