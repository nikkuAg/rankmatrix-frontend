import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

export const RangeFilter = ({
  onApplyFilter,
  filterTitle,
  filterValue,
  handleClose,
  setSelectedValues,
  tempSelected,
  setTempSelected,
}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(tempSelected);

  const handleChange = (_, newValue) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    setTempSelected(inputValue);
  }, [inputValue, setTempSelected]);

  const handleClear = () => {
    setInputValue(filterValue);
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
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">{filterValue[0]}</Typography>
          <Typography variant="body2">{filterValue[1]}</Typography>
        </Box>
        <Slider
          value={inputValue}
          onChange={handleChange}
          min={filterValue[0]}
          max={filterValue[1]}
        />
        <Stack direction={'row'} gap={2} alignItems={'center'} maxWidth={'50%'} m={'auto'}>
          <TextField
            type="number"
            variant="outlined"
            value={inputValue[0]}
            onChange={(e) => setInputValue((prev) => [parseInt(e.target.value), prev[1]])}
            sx={{
              maxWidth: '40%',
            }}
            size="small"
          />
          <Typography variant="body2">-</Typography>
          <TextField
            type="number"
            variant="outlined"
            value={inputValue[1]}
            onChange={(e) => setInputValue((prev) => [prev[0], parseInt(e.target.value)])}
            sx={{
              maxWidth: '40%',
            }}
            size="small"
          />
        </Stack>
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
    </>
  );
};
