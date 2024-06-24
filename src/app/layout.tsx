import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Sheet, Grid } from "@mui/joy";
import Navbar from "./Navigation/NavBar";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/_contexts/User.context";
import ClientWrapper from "@/app/_components/ClientWrapper/ClientWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poem Journal",
  description: "A journal for poems and text editing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
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
        </ClientWrapper>
      </body>
    </html>
  );
}
