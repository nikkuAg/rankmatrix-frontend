'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chip, Stack, useTheme } from '@mui/material';
import { useDebounce } from '@/utils/debounceHook';

export const ChipFilter = ({
  filterList,
  flexDirection = 'row',
  onChange,
  defaultSelected = [],
}) => {
  const [filterValues, setFilterValues] = useState(defaultSelected);
  const debouncedFilterValues = useDebounce(filterValues, 500);
  const theme = useTheme();

  // Parent may recreate onChange every render. Route through a ref so the
  // notify effect depends only on the debounced value and doesn't loop.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleClick = (filter) => {
    setFilterValues((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      }
      return [...prev, filter];
    });
  };

  useEffect(() => {
    onChangeRef.current(debouncedFilterValues);
  }, [debouncedFilterValues]);

  return (
    <Stack direction={flexDirection} spacing={0.8}>
      {filterList.map((filter) => (
        <Chip
          label={filter}
          key={filter}
          onClick={() => handleClick(filter)}
          sx={{
            paddingX: '1rem',
            paddingY: '0.25rem',
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: filterValues.includes(filter)
              ? theme.palette.primary.light
              : 'transparent',
            color: theme.palette.text.main,
            '&:hover': {
              backgroundColor: filterValues.includes(filter)
                ? 'transparent'
                : theme.palette.primary.light,
            },
          }}
        />
      ))}
    </Stack>
  );
};
