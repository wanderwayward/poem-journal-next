// src/app/Navigation/NavBar.tsx
"use client";
import Link from "next/link";
import { Grid, Typography, Button, Box, Avatar } from "@mui/joy";
import { useUser } from "../_contexts/User.context";
import { signOut } from "next-auth/react"; // Import the signOut function

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
        backgroundColor: "background.paper", // Ensures navbar is visible against content
        padding: "8px 16px", // Padding to space content from edges
      }}
    >
      <Box flex={1} display="flex" justifyContent="flex-start">
        <Link href="/poem-upload" passHref>
          <Typography
            component="span"
            sx={{ textDecoration: "none !important", color: "inherit" }}
          >
            Upload
          </Typography>
        </Link>
      </Box>

      <Box flex={2} display="flex" justifyContent="center">
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
      </Box>

      <Box
        flex={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        {user ? (
          <>
            {user.image && (
              <Avatar
                src={user.image}
                alt={user.name}
                sx={{ marginRight: 1 }}
              />
            )}
            <Typography component="span" color="warning" variant="plain">
              {user.name}
            </Typography>
            <Button
              color="warning"
              variant="plain"
              onClick={() => signOut()}
              sx={{ marginLeft: 1 }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link href="/auth" passHref>
            <Typography
              component="span"
              color="warning"
              level="title-lg"
              variant="plain"
              sx={{ textDecoration: "none !important", color: "inherit" }}
            >
              Sign In
            </Typography>
          </Link>
        )}
      </Box>
    </Grid>
  );
};

export default Navbar;
