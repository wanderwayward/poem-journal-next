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

const PoemTitleCard: React.FC<PoemTitleCardProps> = ({
	poem,
	handleDelete,
	handleEdit,
}) => {
	const theme = useTheme();

	// Extracted styles object
	const styles = {
		card: {
			width: { xs: "250px", sm: "280px", md: "300px", lg: "350px" },
			height: "80px",
			my: 1,
			mx: "1rem",
			padding: 2,
			backgroundColor:
				theme.palette.mode === "light" ? "secondary.main" : "error.dark",
			"&:hover": {
				backgroundColor:
					theme.palette.mode === "light" ? "secondary.light" : "error.main",
			},
			borderRadius: "4px",
			boxShadow: theme.shadows[3],
			cursor: "pointer",
		},
		gridContainer: { height: "100%", position: "relative" },
		link: { textDecoration: "none", color: "inherit" },
		titleTypography: {
			margin: 0,
			fontWeight: "bold",
			fontSize: "1.2rem",
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
		},
		authorTypography: {
			margin: 0,
			paddingTop: "1px",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},

		actionsGrid: {
			justifyContent: "center",
			position: "absolute",
			right: 10,
			top: -8,
		},
		editIconButton: {
			color: theme.palette.error.dark,
		},
		deleteIconButton: {
			color: theme.palette.error.dark,
			"&:hover": {
				color: theme.palette.error.main,
			},
		},
	};

	console.log(poem);

	return (
		<Card sx={styles.card}>
			<Grid container spacing={2} sx={styles.gridContainer}>
				{/* Left Section: Content */}
				<Grid size={{ xs: 11 }} direction="column">
					<Link href={`/poem/${poem._id}`} style={styles.link}>
						{/* Title with Tooltip */}
						<Tooltip title={poem.title} placement="top-start">
							<Typography variant="body2" sx={styles.titleTypography}>
								{poem.title}
							</Typography>
						</Tooltip>

						{/* Author and Status */}
						<Typography variant="body2" sx={styles.authorTypography}>
							{poem.author === "Original"
								? poem.username
								: poem.author || "Unknown"}
						</Typography>
					</Link>
				</Grid>

				{/* Right Section: Actions */}
				{handleDelete && handleEdit && (
					<Grid size={{ xs: 1 }} sx={styles.actionsGrid}>
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								handleEdit();
							}}
							size="small"
							sx={styles.editIconButton}
						>
							<Edit fontSize="medium" />
						</IconButton>
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								handleDelete();
							}}
							size="small"
							sx={styles.deleteIconButton}
						>
							<Delete fontSize="medium" />
						</IconButton>
					</Grid>
				)}
			</Grid>
		</Card>
	);
};

export default PoemTitleCard;
