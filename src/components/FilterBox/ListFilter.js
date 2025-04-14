'use client';

import React from 'react';
import { Box, Button, Checkbox, Divider, MenuItem, Typography, useTheme } from '@mui/material';

export const ListFilter = ({
  onApplyFilter,
  filterTitle,
  filterValue,
  handleClose,
  setSelectedValues,
  tempSelected,
  setTempSelected,
}) => {
  const theme = useTheme();

  const handleToggle = (data) => {
    const value = typeof data === 'object' ? data.value : data;
    const currentIndex = tempSelected.indexOf(value);
    const newChecked = [...tempSelected];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTempSelected(newChecked);
  };

  const handleClear = () => {
    setTempSelected([]);
  };

  const handleApply = () => {
    setSelectedValues(tempSelected);
    handleClose();
    if (onApplyFilter) {
      onApplyFilter(tempSelected);
    }
  };
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle1" fontWeight="500">
          {filterTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ py: 1, maxHeight: 180, overflow: 'auto' }}>
        {filterValue.map((value) => (
          <MenuItem key={value} dense onClick={() => handleToggle(value)} sx={{ py: 0.5 }}>
            <Checkbox
              checked={tempSelected.indexOf(typeof value === 'object' ? value.value : value) !== -1}
              size="small"
              sx={
                theme.palette.mode === 'dark' && {
                  '&.Mui-checked': { color: theme.palette.primary.light },
                }
              }
            />
            <Typography variant="body2">
              {typeof value === 'object' ? value.label : value}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Divider />
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Button
          size="small"
          onClick={handleClear}
          variant="outlined"
          sx={{
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          Clear
        </Button>
        <Button
          size="small"
          onClick={handleApply}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.light,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </>
  );
};
