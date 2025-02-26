import {
	Box,
	Paper,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { PoemType } from "@/features/poem/poemTypes";

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
				p: 1, // Padding for spacing
			}}
		>
			<List>
				{searchResults.map((result) => (
					<ListItemButton key={result._id || result.title + result.author}>
						<ListItemText primary={`${result.title} by ${result.author}`} />
					</ListItemButton>
				))}
			</List>
			<Box>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ textAlign: "right" }}
				>
					more results...
				</Typography>
			</Box>
		</Box>
	);
};

export default SearchResults;
