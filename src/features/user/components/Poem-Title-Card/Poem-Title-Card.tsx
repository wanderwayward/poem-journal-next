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
				width: { xs: "250px", sm: "280px", md: "300px" },
				height: "100px",
				padding: 2,
				backgroundColor:
					theme.palette.mode === "light" ? "secondary.main" : "error.dark",
				borderRadius: "8px",
				boxShadow: theme.shadows[3],
				cursor: "pointer",
			}}
		>
			<Grid container spacing={2} sx={{ height: "100%" }}>
				{/* Left Section: Content */}
				<Grid size={{ xs: 9 }} direction="column">
					<Link
						href={`/poem/${poem._id}`}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						{/* Title with Tooltip */}
						<Tooltip title={poem.title} placement="top-start">
							<Typography
								variant="body2"
								sx={{
									margin: 0,
									paddingY: "2px",
									fontWeight: "bold",
									fontSize: "1rem",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
								}}
							>
								{poem.title}
							</Typography>
						</Tooltip>

						{/* Author and Status */}
						<Typography
							variant="body2"
							sx={{
								margin: 0,
								paddingTop: "2px",
								paddingBottom: "1px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{poem.author === "Original"
								? poem.username
								: poem.author || "Unknown"}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								margin: 0,
								paddingTop: "1px",
								paddingBottom: "2px",
								color: theme.palette.text.secondary,
							}}
						>
							{poem.status}
						</Typography>
					</Link>
				</Grid>

				{/* Right Section: Actions */}
				<Grid
					size={{ xs: 3 }}
					sx={{
						gap: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "self-end",
					}}
				>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleEdit();
						}}
						size="small"
						sx={{ color: "white" }}
					>
						<Edit fontSize="small" />
					</IconButton>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						size="small"
						sx={{ color: theme.palette.error.dark }}
					>
						<Delete fontSize="small" />
					</IconButton>
				</Grid>
			</Grid>
		</Card>
	);
}
