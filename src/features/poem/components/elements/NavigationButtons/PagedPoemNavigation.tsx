import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton, SxProps, Theme } from "@mui/material";
import { PoemStanzaType } from "@/features/poem/poemTypes";

interface PagedPoemNavigationProps {
	children: React.ReactNode;
	handlePageChange: (direction: "left" | "right") => void;
	currentPage: number;
	pages: PoemStanzaType[][];
	styles: {
		navContainer: SxProps<Theme>;
		buttonLeft: SxProps<Theme>;
		buttonRight: SxProps<Theme>;
		iconLeft: SxProps<Theme>;
		iconRight: SxProps<Theme>;
	};
}
const PagedPoemNavigation: React.FC<PagedPoemNavigationProps> = ({
	children,
	handlePageChange,
	currentPage,
	pages,
	styles,
}) => {
	return (
		<Box sx={styles.navContainer}>
			<IconButton
				sx={styles.buttonLeft}
				onClick={() => handlePageChange("left")}
				aria-label="previous page"
				disabled={currentPage === 0}
			>
				<NavigateBefore sx={styles.iconLeft} />
			</IconButton>

			{children}

			<IconButton
				sx={styles.buttonRight}
				onClick={() => handlePageChange("right")}
				aria-label="next page"
				disabled={currentPage === pages.length - 2}
			>
				<NavigateNext sx={styles.iconRight} />
			</IconButton>
		</Box>
	);
};

export default PagedPoemNavigation;
