import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'info', // success, error, info, warning
  duration: 20000,
  open: true,
  message: 'This is success toast',
  variant: 'filled', // filled, outlined
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    closeToast: (state) => {
      state.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
