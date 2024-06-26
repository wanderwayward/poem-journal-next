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
        zIndex: 1100, // Keep this high to stay above other content
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
            <Button
              color="warning"
              variant="plain"
              onClick={() => signOut()}
              sx={{ marginRight: 1 }}
            >
              Sign Out
            </Button>
            <Link href="/user" passHref>
              <Typography component="span" color="warning" variant="plain">
                {user.name}
              </Typography>
            </Link>
            {user.image && (
              <Avatar src={user.image} alt={user.name} sx={{ marginLeft: 1 }} />
            )}
          </>
        ) : (
          <>
            <Button
              component={Link}
              href="/auth"
              color="warning"
              variant="plain"
              sx={{
                marginRight: 1,
                textDecoration: "none !important",
                color: "inherit",
              }}
            >
              Sign In
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
};

export default Navbar;
