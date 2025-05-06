"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Grid2 as Grid, Typography, Box, useTheme } from "@mui/material";
import { useUser } from "@/features/user/context/UserContext";
import SearchModal from "./subcomponents/Search/Search";
import UserMenu from "./subcomponents/UserMenu/UserMenu";

const Navbar: React.FC = () => {
	const { user } = useUser();
	const theme = useTheme();

	const [fill, setFill] = useState(theme.palette.error.dark);
	const [textColor, setTextColor] = useState(
		theme.palette.warning.contrastText
	);

	return user ? (
		<Grid
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1100,
				width: "100%",
				padding: "4px 8px",
				maxHeight: "64px",
			}}
		>
			<Grid container justifyContent="space-between" size={{ xs: 12 }}>
				<Link href="/" passHref>
					<Typography
						component="span"
						sx={{
							textDecoration: "none",
							color: "warning.contrastText",
							fontWeight: "bold",
							fontSize: "2.2rem",
							width: "242px",
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

				{/* Avatar with Popover */}
				<UserMenu user={user} theme={theme} />
			</Grid>
			<SearchModal />
		</Grid>
	) : null;
};

export default Navbar;
