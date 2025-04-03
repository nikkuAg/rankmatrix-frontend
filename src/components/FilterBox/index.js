'use client';

import React, { useState } from 'react';
import { FilterList } from '@mui/icons-material';
import { Badge, IconButton, Menu, Stack, useTheme } from '@mui/material';
import { ListFilter } from './ListFilter';
import { RangeFilter } from './RangeFilter';

export const FilterBox = ({
  children,
  flexDirection = 'row',
  filterTitle,
  filterValue = [],
  showFilter = true,
  onApplyFilter,
  defaultSelected = [],
  showRangeFilter = false,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValues, setSelectedValues] = useState(defaultSelected);
  const [tempSelected, setTempSelected] = useState(defaultSelected);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTempSelected([...selectedValues]);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={flexDirection} justifyContent={'space-between'} alignItems={'center'}>
      {children}
      {(showFilter || showRangeFilter) && (
        <>
          <IconButton onClick={handleClick}>
            <Badge
              badgeContent={
                showRangeFilter
                  ? selectedValues[0] === filterValue[0] && selectedValues[1] === filterValue[1]
                    ? 0
                    : 1
                  : selectedValues.length
              }
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.light,
                },
              }}
            >
              <FilterList
                color={
                  (showFilter && selectedValues.length > 0) ||
                  (showRangeFilter &&
                    (selectedValues[0] !== filterValue[0] || selectedValues[1] !== filterValue[1]))
                    ? 'primary'
                    : 'inherit'
                }
              />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 300,
                  maxHeight: 300,
                  py: 0,
                },
              },
            }}
          >
            {showFilter && (
              <ListFilter
                onApplyFilter={onApplyFilter}
                filterTitle={filterTitle}
                filterValue={filterValue}
                handleClose={handleClose}
                setSelectedValues={setSelectedValues}
                tempSelected={tempSelected}
                setTempSelected={setTempSelected}
              />
            )}
            {showRangeFilter && (
              <RangeFilter
                onApplyFilter={onApplyFilter}
                filterTitle={filterTitle}
                filterValue={filterValue}
                handleClose={handleClose}
                setSelectedValues={setSelectedValues}
                tempSelected={tempSelected}
                setTempSelected={setTempSelected}
              />
            )}
          </Menu>
        </>
      )}
    </Stack>
  );
};
