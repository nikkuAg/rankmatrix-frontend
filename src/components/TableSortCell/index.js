import React from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, TableCell } from '@mui/material';
import { SORT_ORDER } from '@/constants';
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
  hideBorderRight = false,
  hideBorderBottom = false,
  showRangeFilter = false,
}) => {
  return (
    <TableCell
      sx={{
        userSelect: 'none',
        borderBottom: `${hideBorderBottom && '0px !important'}`,
        borderRight: `${hideBorderRight && '0px !important'}`,
      }}
    >
      <FilterBox
        filterTitle={filterTitle || title}
        filterValue={filterValues}
        showFilter={showFilter}
        onApplyFilter={onApplyFilter}
        defaultSelected={defaultSelected}
        showRangeFilter={showRangeFilter}
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
            (sortOrder === SORT_ORDER.ASC ? (
              <ArrowUpward fontSize="small" />
            ) : (
              <ArrowDownward fontSize="small" />
            ))}
        </Box>
      </FilterBox>
    </TableCell>
  );
};
