"use client";

import { FC, useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

interface SpecialBoxProps {
  initialColor?: string;
  children: (
    color: string,
    setColor: (color: string) => void
  ) => React.ReactNode;
}

// Define a styled component
const StyledBox = styled(Box)<{ color: string }>`
  background-color: ${(props) => props.color};
  border: 1px solid #000;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
`;

const SpecialBox: FC<SpecialBoxProps> = ({
  initialColor = "#121212",
  children,
}) => {
  const [color, setColor] = useState(initialColor);

  return <StyledBox color={color}>{children(color, setColor)}</StyledBox>;
};

export default SpecialBox;
