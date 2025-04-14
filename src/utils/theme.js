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
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "16px",
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
          padding: "14px",
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: "500",
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
          "&.Mui-selected:hover": {
            color: "var(--color-main)",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontFamily: "var(--second-family)",
          fontWeight: "400",
          textAlign: "center",
          fontSize: "14px",
          "&.Mui-selected": {
            backgroundColor: "var(--color-blue-button)",
            color: "var(--color-white)",
          },
          "&:hover": {
            backgroundColor: "var(--color-blue-button)",
            color: "var(--color-white)",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
        },
      },
    },
  },
});

export default theme;
