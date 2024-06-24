"use client";
import Link from "next/link";
import { Grid, Typography } from "@mui/joy";
import { useUser } from "../_contexts/User.context";

const Navbar = () => {
  const { user } = useUser();

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        width: "100%",
      }}
    >
      <Grid>
        <Link href="/poem-upload" passHref>
          <Typography
            component="span"
            sx={{ textDecoration: "none !important", color: "inherit" }}
          >
            Upload
          </Typography>
        </Link>
      </Grid>
      <Grid>
        <Link href="/" passHref>
          <Typography
            component="span"
            color="warning"
            level="title-lg"
            variant="plain"
            sx={{ textDecoration: "none !important", color: "inherit" }}
          >
            Poem Journal
          </Typography>
        </Link>
      </Grid>
      <Grid>
        <Link href="/auth" passHref>
          <Typography
            component="span"
            color="warning"
            level="title-lg"
            variant="plain"
            sx={{ textDecoration: "none !important", color: "inherit" }}
          >
            {user ? user.name : "Sign In"}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Navbar;
