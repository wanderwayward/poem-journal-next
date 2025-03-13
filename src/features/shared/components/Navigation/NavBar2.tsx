"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Grid2 as Grid, Typography, Box, useTheme } from "@mui/material";
import { useUser } from "@/features/user/context/UserContext";
import SearchModal from "./subcomponents/Search/Search";
import UserMenu from "./subcomponents/UserMenu/UserMenu";
import { HoverableCircle } from "../CustomComponents/CustomComponents";

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
				<Box display="flex" flexDirection={"row"} alignItems={"center"}>
					<Link href="/user" passHref>
						<Box
							display="flex"
							alignItems="center"
							gap={1}
							onMouseEnter={() => {
								setFill(theme.palette.warning.contrastText); // Change circle color
								setTextColor(theme.palette.error.dark); // Change text color
							}}
							onMouseLeave={() => {
								setFill(theme.palette.error.dark); // Reset circle color
								setTextColor(theme.palette.warning.contrastText); // Reset text color
							}}
							sx={{ cursor: "pointer" }}
						>
							<HoverableCircle fill={fill} />
							<Typography
								variant="h2"
								sx={{
									fontWeight: "bold",
									color: textColor,
									fontSize: "2.2rem",
									display: "flex",
									alignItems: "center",
								}}
							>
								POEM VAULT
							</Typography>

							<HoverableCircle fill={fill} />
						</Box>
					</Link>

					{/* Avatar with Popover */}
					<UserMenu user={user} theme={theme} />
				</Box>
			</Grid>
			<SearchModal />
		</Grid>
	) : null;
};

export default Navbar;
