'use client';

import React from 'react';
import { Pagination, Stack, Typography, useTheme } from '@mui/material';

export const PaginationBox = ({ currentPage, totalPages, onPageChange, start, end }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: theme.palette.text.main,
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: theme.palette.gray.light,
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.light,
          },
          '& .MuiPaginationItem-previousNext': {
            backgroundColor: theme.palette.gray.light,
            '&:hover': {
              backgroundColor: theme.palette.gray.dark,
              color: theme.palette.text.light,
            },
          },
        }}
      />
      <Typography variant="body2" color={theme.palette.text.main}>
        Showing results from {start} - {end} of {totalPages}
      </Typography>
    </Stack>
  );
};
