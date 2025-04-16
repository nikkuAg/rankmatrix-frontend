'use client';

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material';

export const Dropdown = ({
  label,
  id,
  selectedValue,
  handleChange,
  listData,
  width = '20%',
  disabled = false,
}) => {
  const theme = useTheme();
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: width,
        boxShadow: `0px 0px 16px 0px ${theme.palette.shadow.main}`,
        '& .MuiOutlinedInput-root': {
          border: `0px`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `2px solid`,
          borderColor: `${disabled ? theme.palette.gray.light : theme.palette.gray.main} !important`,
        },
        '& .MuiFormLabel-root': {
          color: `${disabled ? theme.palette.gray.light : theme.palette.gray.dark}`,
          '&.Mui-focused': {
            color: `${disabled ? theme.palette.gray.light : theme.palette.primary.main}`,
          },
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': {
            borderColor: `${disabled ? theme.palette.gray.light : theme.palette.primary.main} !important`,
          },
          '& .MuiSvgIcon-root': {
            color: `${disabled ? theme.palette.gray.light : theme.palette.primary.main} !important`,
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': {
            borderColor: `${disabled ? theme.palette.gray.light : theme.palette.primary.main} !important`,
          },
          '& .MuiSvgIcon-root': {
            color: `${disabled ? theme.palette.gray.light : theme.palette.primary.main} !important`,
          },
        },
        '&:hover > .MuiFormLabel-root': {
          color: `${disabled ? theme.palette.gray.light : theme.palette.primary.main}`,
        },
        '& .MuiOutlinedInput-root .MuiSvgIcon-root': disabled && {
          color: `${theme.palette.gray.light} !important`,
        },
      }}
    >
      <InputLabel id={id} color={theme.palette.gray.dark}>
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        labelId={id}
        label={label}
        autoWidth
        value={selectedValue}
        onChange={handleChange}
      >
        <MenuItem value={''} disabled>
          {label}
        </MenuItem>
        {listData?.map((data, i) => (
          <MenuItem value={data.value} key={i}>
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
