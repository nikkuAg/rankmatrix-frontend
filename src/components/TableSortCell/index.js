import React from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';
import { FilterBox } from '../FilterBox';

export const TableSortCell = ({
  sortField,
  sortOrder,
  handleSort,
  title,
  field,
  filterValues = [],
  filterTitle,
  showFilter = true,
  onApplyFilter,
  defaultSelected = [],
}) => {
  return (
    <TableCell
      sx={{
        userSelect: 'none',
      }}
    >
      <FilterBox
        filterTitle={filterTitle || title}
        filterValue={filterValues}
        showFilter={showFilter}
        onApplyFilter={onApplyFilter}
        defaultSelected={defaultSelected}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => handleSort(field)}
          sx={{ cursor: 'pointer' }}
        >
          {title}
          {sortField === field &&
            (sortOrder === 'asc' ? (
              <ArrowUpward fontSize="small" />
            ) : (
              <ArrowDownward fontSize="small" />
            ))}
        </Box>
      </FilterBox>
    </TableCell>
  );
};
