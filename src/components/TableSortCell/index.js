import React from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';

export const TableSortCell = ({ sortField, sortOrder, handleSort, title, field }) => {
  return (
    <TableCell
      onClick={() => handleSort(field)}
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {title}
        {sortField === field &&
          (sortOrder === 'asc' ? (
            <ArrowUpward fontSize="small" />
          ) : (
            <ArrowDownward fontSize="small" />
          ))}
      </Box>
    </TableCell>
  );
};
