import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.show = true;
    },
    stopLoading: (state) => {
      state.show = false;
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
