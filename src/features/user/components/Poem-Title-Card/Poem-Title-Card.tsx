import {
	Card,
	IconButton,
	Typography,
	Tooltip,
	Grid2 as Grid,
	useTheme,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import { PoemType } from "@/features/poem/poemTypes";

interface PoemTitleCardProps {
	poem: PoemType;
	handleDelete: () => void;
	handleEdit: () => void;
}

export default function PoemTitleCard({
	poem,
	handleDelete,
	handleEdit,
}: PoemTitleCardProps) {
	const theme = useTheme();

	return (
		<Card
			sx={{
				width: "300px",
				padding: "1em",
				backgroundColor:
					theme.palette.mode === "light" ? "secondary.main" : "error.dark",
				borderRadius: "8px",
				boxShadow: theme.shadows[3],
				cursor: "pointer",
			}}
		>
			<Grid
				container
				spacing={2}
				sx={{
					height: "100%",
				}}
			>
				{/* Left Section (Content) */}
				<Grid
					size={{ xs: 9 }}
					container
					direction="column"
					justifyContent="space-around"
				>
					<Link href={`/poem/${poem._id}`} style={{ textDecoration: "none" }}>
						{/* Title */}
						<Tooltip title={poem.title} placement="top-start">
							<Typography
								variant="h6"
								sx={{
									fontWeight: "bold",
									color: "inherit",
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "-webkit-box",
									webkitLineClamp: 1,
									webkitBoxOrient: "vertical",
								}}
							>
								{poem.title}
							</Typography>
						</Tooltip>

						{/* Author and Status */}
						<Typography variant="body2">
							{poem.author === "Original"
								? poem.username
								: poem.author || "Unknown"}
						</Typography>
						<Typography variant="body2">{poem.status}</Typography>
					</Link>
				</Grid>

				{/* Right Section (Actions) */}
				<Grid
					size={{ xs: 3 }}
					container
					direction="column"
					justifyContent="space-around"
					alignItems="center"
					sx={{ gap: "0.5em" }}
				>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleEdit();
						}}
						size="small"
					>
						<Edit fontSize="small" />
					</IconButton>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						size="small"
					>
						<Delete fontSize="small" />
					</IconButton>
				</Grid>
			</Grid>
		</Card>
	);
}
