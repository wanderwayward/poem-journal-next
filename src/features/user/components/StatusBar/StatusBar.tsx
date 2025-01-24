import { Divider, Grid2 as Grid, Typography } from "@mui/material";

interface StatusBarProps {
	showDrafts: boolean;
	handleToggleDrafts: () => void;
}

const StatusBar = ({ showDrafts, handleToggleDrafts }: StatusBarProps) => {
	return (
		<Grid size={12} sx={{ display: "flex" }} mb={2}>
			<Typography
				onClick={handleToggleDrafts}
				variant="h4"
				sx={{
					color: !showDrafts ? "secondary.dark" : "text.disabled",
					textAlign: {
						xs: "center",
						sm: "left",
					},
					"&:hover": {
						cursor: "pointer",
						color: "error.main",
						transition: "color 0.3s",
					},
				}}
			>
				Published
			</Typography>
			<Divider
				variant="middle"
				orientation="vertical"
				sx={{ mx: 1 }}
				flexItem
			/>
			<Typography
				onClick={handleToggleDrafts}
				variant="h4"
				sx={{
					color: showDrafts ? "secondary.dark" : "text.disabled",
					textAlign: {
						xs: "center",
						sm: "left",
					},
					"&:hover": {
						cursor: "pointer",
						color: "error.main",
						transition: "color 0.3s",
					},
				}}
			>
				Drafts
			</Typography>
		</Grid>
	);
};

export default StatusBar;
