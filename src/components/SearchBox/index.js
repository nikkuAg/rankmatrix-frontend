import React, { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField, useTheme } from '@mui/material';
import { useDebounce } from '@/utils/debounceHook';

export const SearchBox = ({ onChange, width = '100%' }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const theme = useTheme();

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue, onChange]);

  return (
    <TextField
      label="Search by any keyword"
      variant="outlined"
      sx={{
        width,
        boxShadow: `0px 0px 16px 0px ${theme.palette.shadow.main}`,
        '& .MuiOutlinedInput-root': {
          border: `0px`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `2px solid`,
          borderColor: `${theme.palette.gray.main} !important`,
        },
        '& .MuiFormLabel-root': {
          color: `${theme.palette.gray.dark}`,
          '&.Mui-focused': {
            color: `${theme.palette.primary.main}`,
          },
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': {
            borderColor: `${theme.palette.primary.main} !important`,
          },
        },
        '& .MuiOutlinedInput-input': {
          paddingY: '0.4rem',
        },
        '& .Mui-focused > .MuiInputAdornment-root > .MuiSvgIcon-root': {
          color: `${theme.palette.primary.main} !important`,
        },
      }}
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: theme.palette.gray.dark }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
