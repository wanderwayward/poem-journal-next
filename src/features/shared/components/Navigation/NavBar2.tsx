"use client";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import {
	Grid2 as Grid,
	Typography,
	Box,
	useTheme,
	Avatar,
	TextField,
	IconButton,
	Popover,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useUser } from "@/features/user/context/UserContext";

const Navbar: React.FC = () => {
	const { user } = useUser();
	const theme = useTheme();

	// Popover state for Avatar
	const [avatarAnchor, setAvatarAnchor] = useState<HTMLElement | null>(null);
	const handleAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
		setAvatarAnchor(event.currentTarget);
	};
	const handleAvatarClose = () => setAvatarAnchor(null);
	const isAvatarOpen = Boolean(avatarAnchor);

	// Popover state for Search
	const [searchAnchor, setSearchAnchor] = useState<HTMLElement | null>(null);
	const handleSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
		setSearchAnchor(event.currentTarget);
	};
	const handleSearchClose = () => setSearchAnchor(null);
	const isSearchOpen = Boolean(searchAnchor);

	return user ? (
		<Grid
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
					<Typography
						variant="h2"
						sx={{
							fontWeight: "bold",
							color: "warning.contrastText",
							fontSize: "2.2rem",
							display: "flex",
							alignItems: "center",
						}}
					>
						VERSES
						<Box
							component="span"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<svg width="12" height="12" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="6" fill={theme.palette.error.dark} />
							</svg>
						</Box>
						KEPT
					</Typography>

					{/* Avatar with Popover */}
					<Avatar
						alt={user.name}
						src={user.image}
						sx={{ ml: 2, cursor: "pointer" }}
						onClick={handleAvatarClick}
					/>
					<Popover
						open={isAvatarOpen}
						anchorEl={avatarAnchor}
						onClose={handleAvatarClose}
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<Box sx={{ p: 2, width: "500px" }}>
							<Typography variant="subtitle1">Profile Menu</Typography>
							<Typography variant="body2" color="text.secondary">
								This is where profile options will go.
							</Typography>
						</Box>
					</Popover>
				</Box>
			</Grid>

			{/* Search Icon with Popover */}
			<Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
				<Box
					sx={{
						display: "flex",

						justifyItems: "flex-end",

						justifyContent: "space-between",
						width: "242px",
					}}
				>
					<IconButton onClick={handleSearchClick}>
						<Search sx={{ fontSize: "2rem" }} />
					</IconButton>
					<TextField />
				</Box>
				<Popover
					open={isSearchOpen}
					anchorEl={searchAnchor}
					onClose={handleSearchClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					transformOrigin={{ vertical: "top", horizontal: "left" }}
				>
					<Box sx={{ p: 2, width: "500px" }}>
						<Typography variant="subtitle1">Search</Typography>
						<Typography variant="body2" color="text.secondary">
							Search functionality will go here.
						</Typography>
					</Box>
				</Popover>
			</Grid>
		</Grid>
	) : null;
};

export default Navbar;
