'use client';

import React from 'react';
import { Box, TableCell, Typography, useTheme } from '@mui/material';

export const NoDataComponent = ({ colSpan, text = 'No results match the selected filters.' }) => {
  const theme = useTheme();
  // Only table-row callers supply colSpan. A td outside a tr is repaired by
  // the HTML parser before hydration, so the client tree cannot match it.
  const Container = colSpan === undefined ? Box : TableCell;
  return (
    <Container
      {...(colSpan === undefined ? {} : { colSpan })}
      sx={{ borderRight: '0px !important', borderBottom: '0px !important' }}
    >
      <Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography
          variant="p"
          alignSelf={'center'}
          fontWeight={400}
          fontSize={'1rem'}
          sx={{
            color: theme.palette.text.main,
            padding: '10px 20px',
            borderRadius: '10px',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Container>
  );
};
