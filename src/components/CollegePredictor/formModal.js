'use client';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { PAGE_SIZES } from '../../constants';
import { CATEGORIES, SEAT_POOLS, STATES } from '../../constants/josaa';

export const FormModal = ({ open, setOpen, setFormData, getPredictionData, defaultValues }) => {
  const theme = useTheme();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    getPredictionData(formJson)
      .unwrap()
      .then((_) => {
        setFormData(formJson);
        handleClose();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: { backgroundColor: theme.background.main },
        },
      }}
    >
      <DialogTitle>Enter Details to Predict College & Branch</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Not sure where your rank can take you? Enter your info and explore the college branches
          you might get!
        </DialogContentText>
        <Stack direction={'row'} gap={2}>
          <TextField
            autoFocus
            required
            margin="dense"
            name="mainsRank"
            label="JEE Mains Rank"
            type="number"
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues && defaultValues['mainsRank']}
          />
          <TextField
            margin="dense"
            name="advRank"
            label="JEE Advanced Rank"
            type="number"
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues && defaultValues['advRank']}
          />
        </Stack>
        <Stack direction={'row'} gap={2}>
          <TextField
            required
            margin="dense"
            name="category"
            label="JoSAA Category"
            select
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues && defaultValues['category']}
          >
            {Object.keys(CATEGORIES).map((option) => (
              <MenuItem key={option} value={CATEGORIES[option]}>
                {CATEGORIES[option]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            name="seatPool"
            label="Seat Pool"
            select
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues && defaultValues['seatPool']}
          >
            {Object.keys(SEAT_POOLS).map((option) => (
              <MenuItem key={option} value={SEAT_POOLS[option]}>
                {SEAT_POOLS[option]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            name="state"
            label="State"
            select
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues && defaultValues['state']}
          >
            {STATES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <TextField
            required
            defaultValue={defaultValues ? defaultValues['delta'] : 10}
            margin="dense"
            name="delta"
            label="Cutoff Delta(%)"
            type="number"
            fullWidth
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="count"
            label="Number of Results"
            select
            fullWidth
            variant="standard"
            color={theme.palette.mode === 'dark' ? 'text' : 'primary'}
            defaultValue={defaultValues ? defaultValues['count'] : PAGE_SIZES[0]}
          >
            {PAGE_SIZES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Predict
        </Button>
      </DialogActions>
    </Dialog>
  );
};
