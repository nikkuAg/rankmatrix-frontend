'use client';
import { Alert, Snackbar, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from '../../store/slices/toast';

export const SnackBar = () => {
  const toast = useSelector((state) => state.toast);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeToast());
  };

  console.log(theme);

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={toast.duration}
      onClose={handleClose}
    >
      <Alert
        severity={toast.type}
        variant={toast.variant}
        onClose={handleClose}
        sx={{ color: theme.palette.text.secondary }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};
