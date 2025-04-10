import {
	Card,
	IconButton,
	Typography,
	Tooltip,
	Grid2 as Grid,
	useTheme,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import Link from "next/link";
import { PoemType } from "@/features/poem/poemTypes";

interface PoemTitleCardProps {
	poem: PoemType;
}

const PoemTitleCard: React.FC<PoemTitleCardProps> = ({ poem }) => {
	const theme = useTheme();

	// Extracted styles object
	const styles = {
		card: {
			width: "fullwidth",
			height: "80px",
			my: 1,
			mx: "1rem",
			padding: 2,
			backgroundColor:
				theme.palette.mode === "light" ? "primary.main" : "error.dark",
			"&:hover": {
				backgroundColor:
					theme.palette.mode === "light" ? "primary.light" : "error.main",
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
			fontSize: "1.5rem",
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
			color: theme.palette.primary.contrastText,
		},

		actionsGrid: {
			justifyContent: "center",
			position: "absolute",
			right: 0,
			top: -5,
		},
		shareIconButton: {
			color: theme.palette.primary.contrastText,
			"&:hover": {
				color: theme.palette.info.main,
			},
		},
		favoriteIconButton: {
			color: theme.palette.error.main,
			"&:hover": {
				color: theme.palette.error.dark,
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

				<Grid size={{ xs: 1 }} sx={styles.actionsGrid} direction="column">
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
						}}
						size="small"
						sx={styles.favoriteIconButton}
					>
						<Favorite fontSize="medium" />
					</IconButton>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
						}}
						size="small"
						sx={styles.shareIconButton}
					>
						<Share fontSize="medium" />
					</IconButton>
				</Grid>
			</Grid>
		</Card>
	);
};

export default PoemTitleCard;
