"use client";
import Link from "next/link";
import { Fragment } from "react";
import { Grid2 as Grid, Typography, Box, useTheme, alpha } from "@mui/material";
import { signOut } from "next-auth/react";
import { useUser } from "@/features/user/context/UserContext";

const Navbar = () => {
	const { user } = useUser();

	const theme = useTheme();
	const baseBackgroundColor = alpha(theme.palette.neutral.main, 0.8);
	const gradientOverlay = `linear-gradient(to bottom, ${alpha(
		theme.palette.primary.main,
		0.3
	)}, ${alpha(theme.palette.secondary.main, 0.3)})`;

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
				backgroundColor: baseBackgroundColor,
				backgroundImage: gradientOverlay,
				backgroundBlendMode: "overlay",
				transition: "background-color 0.5s, background-image 0.5s",
				padding: "8px 16px",
				boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
			}}
		>
			<Box flex={1} display="flex" justifyContent="flex-start">
				<Link href="/poem/upload" passHref>
					<Typography
						variant="h5"
						component="span"
						sx={{
							textDecoration: "none",
							color: "info.main",
							fontWeight: "bold",
						}}
					>
						UPLOAD
					</Typography>
				</Link>
			</Box>

			<Box flex={2} display="flex" justifyContent="center">
				<Link href="/" passHref>
					<Typography
						component="span"
						sx={{
							textDecoration: "none",
							color: "neutral.contrastText",
							fontWeight: "bold",
						}}
						variant="h4"
					>
						POEM JOURNAL
					</Typography>
				</Link>
			</Box>

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
								variant="h5"
								component="span"
								sx={{
									textDecoration: "none",
									fontWeight: "bold",
									color: "info.main",
									marginRight: 1,
									letterSpacing: 2,
								}}
							>
								{user.name.toUpperCase()}
							</Typography>
						</Link>
						<Typography
							variant="h5"
							component="span"
							onClick={() => signOut()}
							sx={{
								cursor: "pointer",
								fontWeight: "bold",
								textDecoration: "none",
								color: "error.dark",
								letterSpacing: 2,
							}}
						>
							SIGN OUT
						</Typography>
					</Fragment>
				) : (
					<Link href="/auth" passHref>
						<Typography
							variant="h5"
							component="span"
							sx={{
								cursor: "pointer",
								textDecoration: "none",
								color: "warning.dark",
								lineHeight: "1.5",
								pt: 0.2,
							}}
						>
							SIGN IN
						</Typography>
					</Link>
				)}
			</Box>
		</Grid>
	);
};

export default Navbar;
