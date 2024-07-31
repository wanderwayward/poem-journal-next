import { Button, Box, Grid, Avatar, Typography } from "@mui/material";
import { FC } from "react";
import { UserType } from "@/app/_types/Types";

interface UserTopHubProps {
  user: UserType | null;
}

const UserTopHub: FC<UserTopHubProps> = ({ user }) => {
  return user ? (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt={user.name}
          src={user.image}
          sx={{ width: 100, height: 100 }}
        />
        <Grid item xs={12} sx={{ px: 2 }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default UserTopHub;
