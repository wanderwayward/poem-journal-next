import {
	Box,
	Button,
	Typography,
	Paper,
	Theme,
	alpha,
	Grid2 as Grid,
} from "@mui/material";
import Link from "next/link";

interface MenuProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	theme: Theme;
}

const Menu = ({ theme, isOpen }: MenuProps) => {
	const backgroundColor = isOpen
		? alpha(theme.palette.background.paper, 0.9)
		: "transparent";
	return (
		<Grid
			container
			justifyContent="space-between"
			direction="row"
			size={{ xs: 12 }}
		>
			<Grid container justifyContent="center" size={{ xs: 11 }} sx={{ pr: 1 }}>
				<Link href="/poem/upload" passHref>
					<Button
						fullWidth
						sx={{
							backgroundColor: "primary.main",
							textDecoration: "none",
							color: "neutral.contrastText",
							fontWeight: "bold",
						}}
					>
						upload a poem
					</Button>
				</Link>
			</Grid>
			<Grid
				container
				justifyContent="space-evenly"
				direction="column"
				size={{ xs: 1 }}
			>
				<Grid>A</Grid>
				<Grid>A</Grid>
				<Grid>A</Grid>
			</Grid>
		</Grid>
	);
};

export default Menu;
{
	/* <List>
<Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Button
        variant="outlined"
        color="error"
        onClick={() => setIsOpen(false)}
    >
        Upload a Poem
    </Button>
    <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(false)}
    >
        Save
    </Button>
</Box>
<ListItemButton>
    <ListItemText primary="Settings" />
</ListItemButton>
<ListItemButton>
    <ListItemText primary="Logout" />
</ListItemButton>
</List>
<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
<Button
    variant="outlined"
    color="error"
    sx={{ mt: 2 }}
    onClick={() => setIsOpen(false)}
>
    Close
</Button>
<Button
    variant="contained"
    color="primary"
    sx={{ mt: 2, ml: 2 }}
    onClick={() => setIsOpen(false)}
>
    Save
</Button>
</Box> */
}
