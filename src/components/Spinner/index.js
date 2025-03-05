import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Spinner = ({ sx }) => {
  return (
    <Box sx={sx}>
      <CircularProgress size={'2rem'} />
    </Box>
  );
};
