import React, { useRef, useState } from "react";
import Link from "next/link";
import { Avatar, Box, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { User } from "next-auth";
import Menu from "./Menu/Menu";
import { HoverableCircle } from "../../../CustomComponents/CustomComponents";

interface AvatarMenuProps {
	user: User;
	theme: Theme;
}

const UserMenu = ({ user, theme }: AvatarMenuProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const [fill, setFill] = useState(theme.palette.error.dark);
	const [textColor, setTextColor] = useState(
		theme.palette.warning.contrastText
	);

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

	return (
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

				{isOpen && <Menu setIsOpen={setIsOpen} isOpen={isOpen} theme={theme} />}
			</Box>
		</Box>
	);
};

export default UserMenu;
