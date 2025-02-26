import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export const NoDataComponent = () => {
  const theme = useTheme();
  return (
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
        fontWeight={500}
        fontSize={'1.5rem'}
        sx={{
          color: theme.palette.text.main,
          background: theme.palette.warning.main,
          padding: '10px 20px',
          borderRadius: '10px',
        }}
      >
        Data does not exist
      </Typography>
    </Box>
  );
};
