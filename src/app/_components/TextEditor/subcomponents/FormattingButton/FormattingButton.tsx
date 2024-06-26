import React from "react";
import { Button } from "@mui/joy";

interface FormattingButtonProps {
  label: string;
  onFormat: () => void;
}

const FormattingButton: React.FC<FormattingButtonProps> = ({
  label,
  onFormat,
}) => {
  return (
    <Button
      variant="soft"
      color="success"
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent focus change
        onFormat();
      }}
    >
      {label}
    </Button>
  );
};

export default FormattingButton;
