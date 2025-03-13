import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { MouseEventHandler } from "react";

interface PagedPoemNavigationProps {
	children: React.ReactNode;
	handlePageChange: (direction: "left" | "right") => void;
}

const PagedPoemNavigation: React.FC<PagedPoemNavigationProps> = ({
	children,
	handlePageChange,
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
			>
				<NavigateBefore />
			</IconButton>

			{children}

			<IconButton
				sx={{ fontSize: "2rem" }}
				onClick={() => handlePageChange("right")}
				aria-label="next page"
			>
				<NavigateNext />
			</IconButton>
		</Box>
	);
};

export default PagedPoemNavigation;
