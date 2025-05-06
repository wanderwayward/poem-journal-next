import {
	Box,
	Button,
	Typography,
	Paper,
	Theme,
	alpha,
	Grid2 as Grid,
} from "@mui/material";
import Link from "next/link";
import { FaDiceD20 } from "react-icons/fa6";

interface MenuProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	theme: Theme;
}

const Menu = ({ theme, isOpen }: MenuProps) => {
	const backgroundColor = isOpen
		? alpha(theme.palette.background.paper, 0.9)
		: "transparent";
	return (
		<>
			<Grid
				size={{ xs: 12 }}
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					pt: 2,
					width: "100%",
				}}
			>
				<Link href="/poem/upload" passHref>
					<Button
						sx={{
							backgroundColor: "primary.main",
							"&:hover": {
								backgroundColor: alpha(theme.palette.primary.main, 0.8),
							},
							textDecoration: "none",
							color: "neutral.contrastText",
							fontWeight: "bold",
							fontSize: "1.4rem",
							px: 4,
						}}
					>
						upload a poem
					</Button>
				</Link>
			</Grid>
			<Grid
				size={{ xs: 12 }}
				sx={{
					display: "flex",
					justifyContent: "space-around",
					flexDirection: "row",
					pt: 2,
					gap: 2,
				}}
			>
				<Link href="/poem/upload" passHref>
					<Typography
						sx={{
							textDecoration: "none",
							color: "neutral.contrastText",
							"&:hover": {
								color: alpha(theme.palette.primary.main, 0.8),
							},
							fontWeight: "bold",
							px: 2,
							fontSize: "1.25rem",
						}}
					>
						Random Poem
					</Typography>
					{/* <FaDiceD20
						style={{
							color: theme.palette.warning.contrastText,
							fontSize: "1.6rem",
							marginLeft: "0.5rem",
						}}
					/> */}
				</Link>
				<Link href="/poem/upload" passHref>
					<Typography
						sx={{
							textDecoration: "none",
							color: "neutral.contrastText",
							"&:hover": {
								color: theme.palette.warning.main,
							},
							fontWeight: "bold",
							px: 2,
							fontSize: "1.25rem",
						}}
					>
						Sign Out
					</Typography>
				</Link>
			</Grid>
		</>
	);
};

export default Menu;
