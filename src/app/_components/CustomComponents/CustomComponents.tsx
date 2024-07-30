import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SoftTextField = (props: TextFieldProps) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      variant="outlined"
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
          border: "1px solid ${theme.palette.divider}",
          transition: "border-color 0.3s",
        },
        "& .MuiInputBase-input": {
          fontSize: "16px",
          color: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiInputBase-root": {
          borderColor: theme.palette.primary.light,
        },
        "& .Mui-focused .MuiInputBase-root": {
          borderColor: theme.palette.primary.main,
        },
      }}
    />
  );
};
