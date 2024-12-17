// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Container, Grid2 as Grid } from "@mui/material";
import ClientProviders from "./_components/ClientProviders/ClientProviders";
import Navbar from "./Navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Poem Journal",
	description: "A journal for poems and text editing",
};

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
							bgcolor: "secondary",
						}}
					>
						<Navbar />
						<Container
							sx={{
								maxWidth: "xl",
								flexGrow: 1,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								paddingTop: "60px",
							}}
						>
							<Grid container justifyContent="center" alignItems="center">
								<Grid xs={12}>
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
