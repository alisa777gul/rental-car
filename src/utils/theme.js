// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "var(--color-inputs)",
          padding: "12px 16px",
          width: "204px",
          maxHeight: "44px",
          outline: "none",
          fontFamily: "var(--font-family)",
          marginTop: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

export default theme;
