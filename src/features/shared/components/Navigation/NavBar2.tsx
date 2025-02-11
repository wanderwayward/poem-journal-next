"use client";
import Link from "next/link";
import { Fragment } from "react";
import {
	Grid2 as Grid,
	Typography,
	Box,
	useTheme,
	alpha,
	IconButton,
	TextField,
	Tooltip,
	Avatar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useUser } from "@/features/user/context/UserContext";

const Navbar = () => {
	const { user } = useUser();

	const theme = useTheme();

	return user ? (
		<Grid
			container
			justifyContent="space-between"
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1100,
				width: "100%",
				padding: "8px 16px",
				maxHeight: "64px",
			}}
		>
			<Link href="/" passHref>
				<Typography
					component="span"
					sx={{
						textDecoration: "none",
						color: "warning.contrastText",
						fontWeight: "bold",
						fontSize: "2.2rem",
					}}
					variant="h1"
				>
					BRANCH
					<Box
						component="span"
						sx={{
							color: "error.dark",
						}}
					>
						&
					</Box>
					VERSE
				</Typography>
			</Link>
			<Box display="flex" flexDirection={"row"} alignItems={"center"}>
				<Tooltip title="GO TO YOUR VAULT" placement="bottom-start">
					<Typography
						variant="h2"
						sx={{
							fontWeight: "bold",
							color: "warning.contrastText",
							fontSize: "2.2rem",
						}}
					>
						VERSES
						<Box
							component="span"
							sx={{
								color: "error.dark",
								fontWeight: "100",
								fontSize: "2rem",
							}}
						>
							-
						</Box>
						KEPT
					</Typography>
				</Tooltip>
				<Tooltip title="MORE OPTIONS" placement="left-start">
					<Avatar alt={user.name} src={user.image} sx={{ ml: 2 }} />
				</Tooltip>
			</Box>
		</Grid>
	) : null;
};

export default Navbar;
