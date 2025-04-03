import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  filters: {},
  pageSize: 25,
  page: 1,
  ordering: 'opening_rank',
  year: '',
};

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    updateFilters: (state, action) => {
      const filters = { ...state.filters, ...action.payload };
      state.filters = filters;
      state.page = 1;
    },
    removeFilters: (state, action) => {
      const filters = { ...state.filters };
      delete filters[action.payload];
      state.filters = filters;
      state.page = 1;
    },
    resetFilters: (state) => {
      state.filters = {};
      state.page = 1;
    },
    updatePageNumber: (state, action) => {
      state.page = action.payload;
    },
    updateOrdering: (state, action) => {
      state.ordering = action.payload;
      state.page = 1;
    },
    updatePageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    updateYear: (state, action) => {
      state.year = action.payload;
      state.page = 1;
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
  updateYear,
} = rankSlice.actions;

export default rankSlice.reducer;
