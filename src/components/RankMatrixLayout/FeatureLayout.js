'use client';

import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

export const FeatureLayout = ({ children, title }) => {
  const theme = useTheme();
  return (
    <Stack height={'100%'}>
      <Box
        width={'100%'}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.text.light}
        px={4}
        py={5}
      >
        <Typography component="h1" variant={'h4'} fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Box width={'100%'} flexGrow={1} px={{ xs: 0, sm: 4 }}>
        {children}
      </Box>
    </Stack>
  );
};
