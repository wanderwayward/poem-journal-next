// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Sheet, Grid } from "@mui/joy";
import dynamic from "next/dynamic";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poem Journal",
  description: "A journal for poems and text editing",
};

// Dynamically import ClientProviders with no SSR
const ClientProviders = dynamic(
  () => import("@/app/_components/ClientProviders/ClientProviders"),
  {
    ssr: false,
  }
);

// Dynamically import Navbar with no SSR
const Navbar = dynamic(() => import("./Navigation/NavBar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
            {/* Ensure Navbar is client-side */}
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
                  <Grid container justifyContent="center" alignItems="unset">
                    {/* Wrap children with ClientProviders dynamically */}
                    <ClientProviders>{children}</ClientProviders>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Sheet>
        </CssVarsProvider>
      </body>
    </html>
  );
}
