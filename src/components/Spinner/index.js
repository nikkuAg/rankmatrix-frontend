'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Spinner = ({ sx, size }) => {
  // The existing call-sites pass sx={{ width: '6rem' }} to set the visual
  // footprint. Mirror that by defaulting the CircularProgress size to 6rem
  // and letting sx still override the outer Box for layout tweaks.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, ...sx }}>
      <CircularProgress color="primary" size={size ?? '6rem'} thickness={4} />
    </Box>
  );
};
