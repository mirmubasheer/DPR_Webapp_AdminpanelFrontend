import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#30779d",
      light: "rgba(218, 46, 49, 0.1)",
      dark: "rgba(218, 46, 49, 0.8)",
    },
    secondary: {
      main: "#aaaaad",
      light: "rgba(11, 120, 183, 0.1)",
      dark: "rgba(11, 120, 183, 0.8)",
    },
    warning: {
      main: "#30779d",
      light: "rgba(218, 46, 49, 0.1)",
      dark: "rgba(218, 46, 49, 0.8)",
    },
    info: {
      main: "#ffffff",
      light: "rgba(255, 255, 255, 0.1)",
      dark: "rgba(255, 255, 255, 0.8)",
    },
    background: {
      default: "#ffffff",
      // default: 'transparent',
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
  },
  typography: {
    fontFamily: 'Gilroy, Poppins, sans-serif', 
    button: {
      textTransform: "none",
      fontSize: "12px",  // Decreased from 14px
    },
    h1: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "28px",  // Decreased from 32px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "36px",  // Decreased from 40px
      },
      "@media (min-width:900px)": {
        fontSize: "44px",  // Decreased from 48px
      },
      "@media (min-width:1200px)": {
        fontSize: "52px",  // Decreased from 56px
      },
      "@media (min-width:1536px)": {
        fontSize: "60px",  // Decreased from 64px
      },
    },
    h2: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "24px",  // Decreased from 28px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "28px",  // Decreased from 32px
      },
      "@media (min-width:900px)": {
        fontSize: "36px",  // Decreased from 40px
      },
      "@media (min-width:1200px)": {
        fontSize: "44px",  // Decreased from 48px
      },
      "@media (min-width:1536px)": {
        fontSize: "52px",  // Decreased from 56px
      },
    },
    h3: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "20px",  // Decreased from 24px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "24px",  // Decreased from 28px
      },
      "@media (min-width:900px)": {
        fontSize: "28px",  // Decreased from 32px
      },
      "@media (min-width:1200px)": {
        fontSize: "36px",  // Decreased from 40px
      },
      "@media (min-width:1536px)": {
        fontSize: "44px",  // Decreased from 48px
      },
    },
    h4: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "16px",  // Decreased from 20px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "20px",  // Decreased from 24px
      },
      "@media (min-width:900px)": {
        fontSize: "24px",  // Decreased from 28px
      },
      "@media (min-width:1200px)": {
        fontSize: "28px",  // Decreased from 32px
      },
      "@media (min-width:1536px)": {
        fontSize: "36px",  // Decreased from 40px
      },
    },
    h5: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "14px",  // Decreased from 16px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "16px",  // Decreased from 20px
      },
      "@media (min-width:900px)": {
        fontSize: "20px",  // Decreased from 24px
      },
      "@media (min-width:1200px)": {
        fontSize: "24px",  // Decreased from 28px
      },
      "@media (min-width:1536px)": {
        fontSize: "28px",  // Decreased from 32px
      },
    },
    h6: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "12px",  // Decreased from 14px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "14px",  // Decreased from 16px
      },
      "@media (min-width:900px)": {
        fontSize: "16px",  // Decreased from 18px
      },
      "@media (min-width:1200px)": {
        fontSize: "20px",  // Decreased from 24px
      },
      "@media (min-width:1536px)": {
        fontSize: "24px",  // Decreased from 28px
      },
    },
    subtitle1: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "16px",  // Decreased from 18px
      color: "#000000",
      opacity: "85%",
      "@media (min-width:600px)": {
        fontSize: "18px",  // Decreased from 20px
      },
      "@media (min-width:900px)": {
        fontSize: "20px",  // Decreased from 22px
      },
      "@media (min-width:1200px)": {
        fontSize: "22px",  // Decreased from 24px
      },
      "@media (min-width:1536px)": {
        fontSize: "24px",  // Decreased from 26px
      },
    },
    subtitle2: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "14px",  // Decreased from 16px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "16px",  // Decreased from 18px
      },
      "@media (min-width:900px)": {
        fontSize: "18px",  // Decreased from 20px
      },
      "@media (min-width:1200px)": {
        fontSize: "20px",  // Decreased from 22px
      },
      "@media (min-width:1536px)": {
        fontSize: "22px",  // Decreased from 24px
      },
    },
    body1: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "12px",  // Decreased from 14px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "14px",  // Decreased from 16px
      },
      "@media (min-width:900px)": {
        fontSize: "16px",  // Decreased from 18px
      },
      "@media (min-width:1200px)": {
        fontSize: "18px",  // Decreased from 20px
      },
      "@media (min-width:1536px)": {
        fontSize: "20px",  // Decreased from 22px
      },
    },
    body2: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "10px",  // Decreased from 12px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "12px",  // Decreased from 14px
      },
      "@media (min-width:900px)": {
        fontSize: "14px",  // Decreased from 16px
      },
      "@media (min-width:1200px)": {
        fontSize: "16px",  // Decreased from 18px
      },
      "@media (min-width:1536px)": {
        fontSize: "18px",  // Decreased from 20px
      },
    },
    caption: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "8px",   // Decreased from 10px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "10px",  // Decreased from 12px
      },
      "@media (min-width:900px)": {
        fontSize: "12px",  // Decreased from 14px
      },
      "@media (min-width:1200px)": {
        fontSize: "14px",  // Decreased from 16px
      },
      "@media (min-width:1536px)": {
        fontSize: "16px",  // Decreased from 18px
      },
    },
    overline: {
      fontFamily: 'Gilroy, Poppins, sans-serif',
      fontSize: "6px",   // Decreased from 8px
      color: "#000000",
      "@media (min-width:600px)": {
        fontSize: "8px",  // Decreased from 10px
      },
      "@media (min-width:900px)": {
        fontSize: "10px",  // Decreased from 12px
      },
      "@media (min-width:1200px)": {
        fontSize: "12px",  // Decreased from 14px
      },
      "@media (min-width:1536px)": {
        fontSize: "14px",  // Decreased from 16px
      },
    },
  },  
  
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#aaaaad",
            color: "#000000",
            border: "1px solid #30779d",
          },
          textTransform: "capitalize",
          fontFamily: 'Gilroy, Poppins, sans-serif',
          fontSize: "16px",
          borderRadius: "8px",
          height: "44px",
          padding: "12px 24px",
          width: "auto",
          color: "#ffffff",
          backgroundColor: "#30779d",

        },
        outlined: {
          '&:hover': {
            color: '#000000',
            border: "1.5px solid #aaaaad",
            backgroundColor: '#aaaaad',
            '& img': {
              filter: 'brightness(0) invert(1)',
            },
            '& .MuiTypography-root': {
              color: 'white',
            },
          },
          textTransform: "capitalize",
          fontFamily: 'Gilroy, Poppins, sans-serif',
          fontSize: "16px",
          borderRadius: "8px",
          height: "44px",
          padding: "12px 24px",
          width: "auto",
          border: "1.5px solid #aaaaad",
          backgroundColor: '#ffffff',
          color: '#aaaaad',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          '& fieldset': {
            borderRadius: '10px',
          },
          '& input::placeholder': {
            fontSize: '16px',
            fontFamily: 'Gilroy, Poppins, sans-serif',
          },
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          color: "#000000",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          color: "#000000",
          opacity: "70%",
          fontSize: "20px",
        },
        shrink: ({ ownerState }) => ({
          ...(ownerState.shrink && {
            fontSize: "18px !important",
          }),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          fontSize: "18px",
          lineHeight: "27px",
          color: "#000000",
        },
        notchedOutline: {
          borderColor: "#ccc",
        },
        root: {
          background: "white",
          "&.Mui-focused": {
            background: "#F8F8F9",
            boxShadow: "0px 6px 12px #3C599829",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          color: "#000000",
          fontSize: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 2px 10px #0000001A",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 20px #0000001A",
          borderRadius: "10px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 5px 20px #0000001A",
          borderRadius: "8px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          color: "#000000",
          fontSize: "18px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          fontSize: "18px",
          color: "#000000",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
        },
        option: {
          fontFamily: 'Gilroy, Poppins, sans-serif',
          fontSize: "18px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#000000", // Ensure default color is black
          fontFamily: 'Gilroy, Poppins, sans-serif',
        },
      },
    },
  },
});
