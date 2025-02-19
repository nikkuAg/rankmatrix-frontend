"use client";

import React from "react";
import { Alert, Snackbar, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../../store/slices/toast";

export const SnackBar = () => {
  const toast = useSelector((state) => state.toast);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={toast.duration}
      onClose={handleClose}
      sx={{ zIndex: 9999 }}
    >
      <Alert
        severity={toast.type}
        variant={toast.variant}
        onClose={handleClose}
        sx={{ color: theme.palette.text.main }}
      >
        {toast.message?.length > 100 ? "Something went wrong. Please try again." : toast.message}
      </Alert>
    </Snackbar>
  );
};
