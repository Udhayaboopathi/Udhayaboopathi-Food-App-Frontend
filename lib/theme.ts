/**
 * Custom Material-UI Theme for EatUpNow
 * Brand colors: Deep Orange (#FF6B35) + Royal Blue (#264653)
 * Secondary: Off-white (#FFF8F2) + Lime accent (#C6FF00)
 */
"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B35",
      light: "#FF8A5C",
      dark: "#E55828",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#264653",
      light: "#3D5A6B",
      dark: "#1A3340",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#C6FF00",
      light: "#D4FF33",
      dark: "#A3CC00",
      contrastText: "#264653",
    },
    background: {
      default: "#FFF8F2",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#264653",
      secondary: "#5A7481",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(255, 107, 53, 0.25)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 6px 16px rgba(255, 107, 53, 0.35)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(38, 70, 83, 0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(38, 70, 83, 0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});
