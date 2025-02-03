// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Container, Grid2 as Grid } from "@mui/material";
import ClientProviders from "@/features/shared/components/ClientProviders/ClientProviders";
import Navbar from "@/features/shared/components/Navigation/NavBar";
import TreeAnimation from "@/features/tree-animation/components/TreeAnimation";
import AnimationContainer from "@/features/tree-animation/AnimationContainer";

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
	const hasPlayedFlag = true;
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientProviders>
					<Box
						sx={{
							position: "relative",
							zIndex: 0,
							width: "100%",
							minHeight: "100vh",
							display: "flex",
							flexDirection: "column",
							backgroundColor: "neutral.light",
						}}
					>
						<Navbar />

						<TreeAnimation season="Winter" />

						{hasPlayedFlag && (
							<Box
								sx={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									backgroundColor: "rgba(36, 36, 36, 0.66)", // Full gray for mixing
									mixBlendMode: "screen",
									pointerEvents: "none", // Prevent interaction
									zIndex: -1,
								}}
							/>
						)}
						{/* <AnimationContainer /> */}
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%", // Ensure it spans the full width
								paddingTop: "60px",
							}}
						>
							{children}
						</Box>
					</Box>
				</ClientProviders>
			</body>
		</html>
	);
}
