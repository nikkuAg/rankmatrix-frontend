import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  filters: {},
  pageSize: 25,
  page: 1,
  ordering: null,
  showChange: false,
  currentYear: null,
};

const seatSlice = createSlice({
  name: 'seat',
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
    setIncreaseFilter: (state, action) => {
      state.showChange = true;
      state.currentYear = action.payload;
    },
    removeIncreaseFilter: (state) => {
      state.showChange = false;
      state.currentYear = null;
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
  setIncreaseFilter,
  removeIncreaseFilter,
} = seatSlice.actions;

export default seatSlice.reducer;
