import { announcementApi } from '../queries/announcement';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  year: null,
};

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setYear } = announcementSlice.actions;

export default announcementSlice.reducer;
