/**
 * Toast Notifications Component
 * Global notification system for order updates, delivery status, and alerts
 */
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Snackbar,
  Alert,
  AlertColor,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface Toast {
  id: number;
  message: string;
  type: AlertColor;
  duration?: number;
  title?: string;
}

interface ToastContextType {
  showToast: (
    message: string,
    type?: AlertColor,
    title?: string,
    duration?: number
  ) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (
      message: string,
      type: AlertColor = "info",
      title?: string,
      duration = 6000
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, title, duration }]);

      // Auto-dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, title?: string) => showToast(message, "success", title),
    [showToast]
  );

  const showError = useCallback(
    (message: string, title?: string) => showToast(message, "error", title),
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, title?: string) => showToast(message, "info", title),
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, title?: string) => showToast(message, "warning", title),
    [showToast]
  );

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {children}

      {/* Toast Container */}
      <Box
        sx={{
          position: "fixed",
          top: 80,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: 400,
        }}
      >
        {toasts.map((toast, index) => (
          <Alert
            key={toast.id}
            severity={toast.type}
            variant="filled"
            sx={{
              width: "100%",
              boxShadow: 4,
              animation: "slideIn 0.3s ease-out",
              "@keyframes slideIn": {
                from: {
                  transform: "translateX(400px)",
                  opacity: 0,
                },
                to: {
                  transform: "translateX(0)",
                  opacity: 1,
                },
              },
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose(toast.id)}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          >
            {toast.title && (
              <Typography variant="subtitle2" fontWeight={600}>
                {toast.title}
              </Typography>
            )}
            <Typography variant="body2">{toast.message}</Typography>
          </Alert>
        ))}
      </Box>
    </ToastContext.Provider>
  );
}
