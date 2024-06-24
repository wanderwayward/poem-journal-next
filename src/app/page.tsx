// src/app/page.tsx
import { Box, Typography } from "@mui/joy";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 60px)", // Full viewport height minus 60px for the navbar
        display: "flex", // Establishes a flex container for flexible box layout
        flexDirection: "column", // Ensures the boxes are stacked vertically
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
        textAlign: "center",
        paddingTop: "16px", // Adjust to push content up slightly
      }}
    >
      <Typography level="title-lg" marginBottom="16px">
        The Facts of Life
      </Typography>
      <Typography
        color="warning"
        level="body-lg"
        variant="soft"
        sx={{ width: "80%" }}
      >
        That you were born and you will die. That you will sometimes love enough
        and sometimes not. That you will lie if only to yourself. That you will
        get tired. That you will learn most from the situations you did not
        choose. That there will be some things that move you more than you can
        say. That you will live that you must be loved. That you will avoid
        questions most urgently in need of your attention. That you began as the
        fusion of a sperm and an egg of two people who once were strangers and
        may well still be. That life isn’t fair. That life is sometimes good and
        sometimes even better than good. That life is often not so good. That
        life is real and if you can survive it, well, survive it well with love
        and art and meaning given where meaning’s scarce. That you will learn to
        live with regret. That you will learn to live with respect. That the
        structures that constrict you may not be permanently constricting. That
        you will probably be okay. That you must accept change before you die
        but you will die anyway. So you might as well live and you might as well
        love. You might as well love. You might as well love.
      </Typography>
    </Box>
  );
};

export default Home;
