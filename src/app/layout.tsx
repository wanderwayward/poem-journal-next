"use client";
import { Inter } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Sheet, Grid } from "@mui/joy";
import Navbar from "./Navigation/NavBar";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_contexts/User.context";
import "./globals.css";
import { metadata } from "./layoutMetadata";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <UserProvider>
            <CssVarsProvider>
              <CssBaseline />
              <Sheet
                variant="soft"
                color="warning"
                sx={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Navbar />
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "100%", height: "100%", paddingTop: "60px" }}
                >
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid xs={12} style={{ width: "100%" }}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="unset"
                      >
                        {children}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Sheet>
            </CssVarsProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
