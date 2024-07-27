"use client";
import Link from "next/link";
import { Grid, Typography, Button, Box, Avatar } from "@mui/material";
import { useUser } from "../_contexts/User.context";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        width: "100%",
        backgroundColor: "beige",
        padding: "8px 16px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box flex={1} display="flex" justifyContent="flex-start">
        <Link href="/poem-upload" passHref>
          <Typography
            component="span"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Upload
          </Typography>
        </Link>
      </Box>

      <Box flex={2} display="flex" justifyContent="center">
        <Link href="/" passHref>
          <Typography
            component="span"
            color="warning.main"
            sx={{ textDecoration: "none", color: "inherit" }}
            variant="h6"
          >
            Poem Journal
          </Typography>
        </Link>
      </Box>

      <Box
        flex={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        {user ? (
          <>
            <Button
              color="warning"
              variant="text"
              onClick={() => signOut()}
              sx={{ marginRight: 1 }}
            >
              Sign Out
            </Button>
            <Link href="/user" passHref>
              <Typography component="span" color="warning.main">
                {user.name}
              </Typography>
            </Link>
            {user.image && (
              <Avatar src={user.image} alt={user.name} sx={{ marginLeft: 1 }} />
            )}
          </>
        ) : (
          <Button
            component={Link}
            href="/auth"
            color="warning"
            variant="text"
            sx={{
              marginRight: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default Navbar;
