import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  filters: {},
  pageSize: 1,
  page: 1,
  ordering: null,
};

const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.search = action.payload;
    },
    updateFilters: (state, action) => {
      const filters = { ...state.filters, ...action.payload };
      state.filters = filters;
    },
    removeFilters: (state, action) => {
      const filters = { ...state.filters };
      delete filters[action.payload];
      state.filters = filters;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
    updatePageNumber: (state, action) => {
      state.page = action.payload;
    },
    updateOrdering: (state, action) => {
      state.ordering = action.payload;
    },
    updatePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  updateSearchValue,
  updateFilters,
  removeFilters,
  resetFilters,
  updateOrdering,
  updatePageNumber,
  updatePageSize,
} = collegeSlice.actions;

export default collegeSlice.reducer;
