import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box } from "@mui/material";

interface PagedPoemNavigationProps {
	children: React.ReactNode;
}

const PagedPoemNavigation: React.FC<PagedPoemNavigationProps> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<NavigateBefore sx={{ fontSize: "2rem" }} />
			{children}
			<NavigateNext sx={{ fontSize: "2rem" }} />
		</Box>
	);
};

export default PagedPoemNavigation;
