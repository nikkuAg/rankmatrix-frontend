'use client';

import React from 'react';
import { Box, TableContainer, useTheme } from '@mui/material';

export const TableLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Box}
      width={'100%'}
      borderRadius={'12px'}
      bgcolor={theme.background.default}
      boxShadow={`0px 0px 28px 0px ${theme.palette.shadow.main}`}
      overflow={'auto'}
    >
      {children}
    </TableContainer>
  );
};
