import React from 'react';
import { Box, TableCell, Typography, useTheme } from '@mui/material';

export const NoDataComponent = ({
  colSpan,
  text = 'Data for the applied filters does not exists',
}) => {
  const theme = useTheme();
  return (
    <TableCell
      colSpan={colSpan}
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
    </TableCell>
  );
};
