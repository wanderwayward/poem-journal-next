import {
	Grid2 as Grid,
	Avatar,
	Typography,
	Box,
	Paper,
	useTheme,
	Button,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { UserType } from "@/features/user/userTypes"; //user types need to be moved out of the editor folder but that will be later

interface UserTopHubProps {
	user: UserType | null;
}

const UserTopHub: FC<UserTopHubProps> = ({ user }) => {
	const theme = useTheme();
	return user ? (
		<Paper
			sx={{
				direction: "row",
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				padding: 1,
				backgroundColor: theme.palette.warning.main,
			}}
			elevation={1}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Avatar
					alt={user.name}
					src={user.image}
					sx={{ width: 100, height: 100 }}
				/>
				<Box sx={{ ml: 2, alignContent: "center" }}>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						{user.name}
					</Typography>
					{/* <Typography variant="h6">{user.email}</Typography> */}
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Member since:{" "}
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 1,
					pr: 2,
				}}
			>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Feeling inspired?
				</Typography>
				<Link href="/poem/upload" passHref>
					<Button
						fullWidth
						sx={{
							backgroundColor: theme.palette.primary.main,
							"&:hover": {
								backgroundColor: theme.palette.primary.dark,
								color: theme.palette.primary.contrastText,
							},
							textDecoration: "none",
							color: "neutral.contrastText",
							fontWeight: "bold",
						}}
					>
						upload a poem
					</Button>
				</Link>
			</Box>
		</Paper>
	) : null;
};

export default UserTopHub;
