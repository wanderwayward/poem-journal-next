// src/app/layout.tsx
import type { Metadata } from "next";
import { Poiret_One } from "next/font/google";
import "./globals.css";
import { Box, Grid2 as Grid } from "@mui/material";
import ClientProviders from "@/features/shared/components/ClientProviders/ClientProviders";
import Navbar from "@/features/shared/components/Navigation/NavBar2";
import TreeAnimation from "@/features/tree-animation/components/TreeAnimation";
import AnimationContainer from "@/features/tree-animation/AnimationContainer";

const poiretOne = Poiret_One({
	weight: "400",
	subsets: ["latin"],
});

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
			<body className={poiretOne.className}>
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

						<TreeAnimation season="Spring" />

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
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
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
