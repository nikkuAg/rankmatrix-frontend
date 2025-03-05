'use client';

import React from 'react';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

export const FeatureLayout = ({ children, title, maxWidth = 'lg' }) => {
  const theme = useTheme();
  return (
    <Stack height={'100%'}>
      <Box
        width={'100%'}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.text.light}
        px={2}
        py={5}
      >
        <Typography variant={'h4'} fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Container maxWidth={maxWidth} sx={{ flexGrow: 1 }} width={'100%'} height={'100%'}>
        {children}
      </Container>
    </Stack>
  );
};
