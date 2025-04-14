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
					color: !showDrafts ? "error.dark" : "text.disabled",
					textAlign: {
						xs: "center",
						sm: "left",
					},
					fontWeight: !showDrafts ? "bold" : "normal",
					"&:hover": {
						cursor: "pointer",
						color: "error.main",
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
					color: showDrafts ? "error.dark" : "text.disabled",
					textAlign: {
						xs: "center",
						sm: "left",
					},
					fontWeight: showDrafts ? "bold" : "normal",
					"&:hover": {
						cursor: "pointer",
						color: "error.main",
					},
				}}
			>
				Drafts
			</Typography>
		</Grid>
	);
};

export default StatusBar;
