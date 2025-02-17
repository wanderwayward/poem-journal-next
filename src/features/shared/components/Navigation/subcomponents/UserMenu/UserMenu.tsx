import React, { useRef, useState } from "react";
import {
	Paper,
	Box,
	Avatar,
	List,
	ListItemButton,
	ListItemText,
	alpha,
	Theme,
} from "@mui/material";
import { User } from "next-auth";

interface AvatarMenuProps {
	user: User;
	theme: Theme;
}

const UserMenu = ({ user, theme }: AvatarMenuProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	// Handles focus when clicking the avatar
	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	// Close when clicking outside
	const handleBlur = () => {
		setTimeout(() => {
			if (
				containerRef.current &&
				!containerRef.current.contains(document.activeElement)
			) {
				setIsOpen(false);
			}
		}, 100);
	};

	const backgroundColor = isOpen
		? alpha(theme.palette.background.paper, 0.9)
		: "transparent";

	return (
		<Box
			ref={containerRef}
			tabIndex={0} // Allows focus handling
			onBlur={handleBlur}
			sx={{
				position: "relative",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Box
				onClick={handleToggle}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
					borderRadius: "4px",
					p: 0.5,
					backgroundColor: isOpen
						? theme.palette.background.paper
						: "transparent",
					transition: "background-color 0.2s",
					"&:hover": { backgroundColor: theme.palette.background.paper },
				}}
			>
				<Avatar
					alt={user.name ?? "User"} // Provide a default name
					src={user.image ?? "/default-avatar.png"} // Provide a default image
					sx={{ cursor: "pointer" }}
				/>
			</Box>

			{isOpen && (
				<Paper
					elevation={4}
					sx={{
						position: "absolute",
						top: "100%",
						right: 0,
						width: "500px", // Matches SearchModal width
						mt: 1,
						p: 2,
						backgroundColor: backgroundColor,
					}}
				>
					<List>
						<ListItemButton>
							<ListItemText primary="Profile" />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary="Settings" />
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</List>
				</Paper>
			)}
		</Box>
	);
};

export default UserMenu;
