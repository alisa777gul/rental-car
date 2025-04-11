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
          width: "auto",

          outline: "none",
          fontFamily: "var(--font-family)",

          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "1.25",
          color: "var(--color-main)",
          maxHeight: "44px",
        },
        select: {
          padding: "0px !important",
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--color-white)",
          borderRadius: "0px 0px 12px 12px",
          boxShadow: "0px 4px 36px rgba(0,0,0,0.2)",
          maxHeight: "272px",
          marginTop: "4px",
          padding: "14px 0",
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family)",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "1.25",
          color: "var(--color-grey)",
          padding: "8px 14px",
          "&:hover": {
            color: "var(--color-main)",
            backgroundColor: "transparent",
          },
          "&.Mui-selected": {
            color: "var(--color-main)",
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
