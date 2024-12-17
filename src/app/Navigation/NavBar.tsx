"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Grid2 as Grid, Typography, Box } from "@mui/material";
import { useUser } from "../_contexts/User.context";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { user } = useUser();

	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const newIsScrolled = window.scrollY > 10;
			if (newIsScrolled !== isScrolled) {
				setIsScrolled(newIsScrolled);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isScrolled]);

	return (
		<Grid
			container
			justifyContent="space-between"
			alignItems="center"
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1100,
				width: "100%",
				backgroundColor: isScrolled ? "transparent" : "success.dark",
				transition: "background-color 0.5s",
				padding: "8px 16px",
				boxShadow: isScrolled ? "none" : "0px 4px 8px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Box flex={1} display="flex" justifyContent="flex-start">
				<Link href="/poem/upload" passHref>
					<Typography
						component="span"
						sx={{ textDecoration: "none", color: "success.light" }}
					>
						Upload
					</Typography>
				</Link>
			</Box>
			{isScrolled ? null : (
				<Box flex={2} display="flex" justifyContent="center">
					<Link href="/" passHref>
						<Typography
							component="span"
							sx={{ textDecoration: "none", color: "success.contrastText" }}
							variant="h6"
						>
							Poem Journal
						</Typography>
					</Link>
				</Box>
			)}
			<Box
				flex={1}
				display="flex"
				justifyContent="flex-end"
				alignItems="center"
			>
				{user ? (
					<Fragment>
						<Link href="/user" passHref>
							<Typography
								component="span"
								sx={{
									textDecoration: "none",
									color: "success.contrastText",
									fontSize: "inherit",
									lineHeight: "1.5",
									marginRight: 1,
								}}
							>
								{user.name}
							</Typography>
						</Link>
						<Typography
							component="span"
							onClick={() => signOut()}
							sx={{
								cursor: "pointer",
								textDecoration: "none",
								color: "warning.main",
								fontSize: "inherit",
								lineHeight: "1.5",
								pt: 0.2,
							}}
						>
							Sign Out
						</Typography>
					</Fragment>
				) : (
					<Link href="/auth" passHref>
						<Typography
							component="span"
							sx={{
								cursor: "pointer",
								textDecoration: "none",
								color: "warning.main",
								fontSize: "inherit",
								lineHeight: "1.5",
								pt: 0.2,
							}}
						>
							Sign In
						</Typography>
					</Link>
				)}
			</Box>
		</Grid>
	);
};

export default Navbar;
