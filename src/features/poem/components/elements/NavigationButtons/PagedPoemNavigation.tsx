import { ArrowBack, ArrowForward } from "@mui/icons-material";
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
				justifyContent: "space-between",
			}}
		>
			<ArrowBack />
			{children}
			<ArrowForward />
		</Box>
	);
};

export default PagedPoemNavigation;
