/**
 * Custom Material-UI Theme for EatUpNow
 * Modern gradient design with innovative UI elements
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
      main: "#4CAF50",
      light: "#66BB6A",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#42A5F5",
      dark: "#1976D2",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#6B7280",
    },
  },
  typography: {
    fontFamily:
      '"Inter", "SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: "none" as const,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "1rem",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1.1rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});
