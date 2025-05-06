"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Grid2 as Grid, Typography, Box, useTheme, Paper } from "@mui/material";
import { useUser } from "@/features/user/context/UserContext";
import SearchModal from "./subcomponents/Search/Search";
import UserMenu from "./subcomponents/UserMenu/UserMenu";

const Navbar: React.FC = () => {
	const { user } = useUser();
	const theme = useTheme();
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

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
				{/* <SearchModal /> */}

				<Box
					ref={containerRef}
					component={isOpen ? Paper : "div"}
					elevation={isOpen ? 4 : 0}
					sx={{
						display: "flex",
						alignItems: "center",

						...(isOpen && { backgroundColor: theme.palette.background.paper }),
					}}
				>
					<UserMenu
						user={user}
						theme={theme}
						setIsOpen={setIsOpen}
						isOpen={isOpen}
					/>
				</Box>
			</Grid>
			<SearchModal />
		</Grid>
	) : null;
};

export default Navbar;
