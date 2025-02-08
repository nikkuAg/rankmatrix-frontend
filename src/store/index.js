import { configureStore } from '@reduxjs/toolkit';

import toastSlice from './slices/toast';
import { baseApi } from './queries';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
