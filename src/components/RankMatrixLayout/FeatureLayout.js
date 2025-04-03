'use client';

import React from 'react';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

export const FeatureLayout = ({ children, title, maxWidth = 'xl' }) => {
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
      <Container maxWidth={maxWidth} sx={{ flexGrow: 1 }} height={'100%'}>
        <Box px={4}>{children}</Box>
      </Container>
    </Stack>
  );
};
