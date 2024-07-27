// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { Box, Container, Grid } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poem Journal",
  description: "A journal for poems and text editing",
};

// Dynamically import ClientProviders with no SSR
const ClientProviders = dynamic(
  () => import("@/app/_components/ClientProviders/ClientProviders"),
  { ssr: false }
);

// Dynamically import Navbar with no SSR
const Navbar = dynamic(() => import("./Navigation/NavBar"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "warning.main",
            }}
          >
            <Navbar />
            <Container
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "60px",
              }}
            >
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Grid container justifyContent="center" alignItems="unset">
                    {children}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ClientProviders>
      </body>
    </html>
  );
}
