// src/components/BackgroundImage.tsx
import React from "react";
import { Box } from "@mui/joy";

interface BackgroundImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt,
  children,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Adjust opacity to suit your needs
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundImage;
