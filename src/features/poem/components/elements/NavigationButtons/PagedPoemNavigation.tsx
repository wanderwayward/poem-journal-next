import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { PoemStanzaType } from "@/features/poem/poemTypes";

interface PagedPoemNavigationProps {
	children: React.ReactNode;
	handlePageChange: (direction: "left" | "right") => void;
	currentPage: number;
	pages: PoemStanzaType[][];
}

const PagedPoemNavigation: React.FC<PagedPoemNavigationProps> = ({
	children,
	handlePageChange,
	currentPage,
	pages,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<IconButton
				sx={{ fontSize: "2rem" }}
				onClick={() => handlePageChange("left")}
				aria-label="previous page"
				disabled={currentPage === 0}
			>
				<NavigateBefore />
			</IconButton>

			{children}

			<IconButton
				sx={{ fontSize: "2rem" }}
				onClick={() => handlePageChange("right")}
				aria-label="next page"
				disabled={currentPage === pages.length - 2}
			>
				<NavigateNext />
			</IconButton>
		</Box>
	);
};

export default PagedPoemNavigation;
