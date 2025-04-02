'use client';

import React, { useState } from 'react';
import { FilterList } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

export const FilterBox = ({
  children,
  flexDirection = 'row',
  filterTitle,
  filterValue = [],
  showFilter = true,
  onApplyFilter,
  defaultSelected = [],
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
    <Stack direction={flexDirection} justifyContent={'space-between'} alignItems={'center'}>
      {children}
      {showFilter && (
        <>
          <IconButton onClick={handleClick}>
            <Badge
              badgeContent={selectedValues.length}
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.light,
                },
              }}
            >
              <FilterList color={selectedValues.length > 0 ? 'primary' : 'inherit'} />
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
                    checked={
                      tempSelected.indexOf(typeof value === 'object' ? value.value : value) !== -1
                    }
                    size="small"
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
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
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
          </Menu>
        </>
      )}
    </Stack>
  );
};
