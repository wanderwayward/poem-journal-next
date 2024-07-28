import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

export const SoftTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#f5f5f5", // light gray background
    borderRadius: "8px", // rounded corners
    transition: "border-color 0.3s",
  },
  "& .MuiInputBase-input": {
    fontSize: "16px", // font size
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // remove default border
  },
  "&:hover .MuiInputBase-root": {
    borderColor: "#b0b0b0", // border color on hover
  },
  "& .Mui-focused .MuiInputBase-root": {
    borderColor: "#9c27b0", // focus border color (purple)
  },
}));
