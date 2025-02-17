import {
	Box,
	Paper,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

interface SearchResultsProps {
	isSearchOpen: boolean;
}

const SearchResults = ({ isSearchOpen }: SearchResultsProps) => {
	if (!isSearchOpen) return null;

	return (
		<Box
			sx={{
				width: "100%", // Ensures it takes up the full width of the parent Paper
				p: 1, // Padding for spacing
			}}
		>
			<List>
				<ListItemButton>
					<ListItemText primary="Result 1" />
				</ListItemButton>
				<ListItemButton>
					<ListItemText primary="Result 2" />
				</ListItemButton>
				<ListItemButton>
					<ListItemText primary="Result 3" />
				</ListItemButton>
				<ListItemButton>
					<ListItemText primary="Result 3" />
				</ListItemButton>
				<ListItemButton>
					<ListItemText primary="Result 3" />
				</ListItemButton>
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
