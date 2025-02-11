import { configureStore } from '@reduxjs/toolkit';

import { announcementApi } from './queries/announcement';
import loaderSlice from './slices/loader';
import toastSlice from './slices/toast';
import { baseApi } from './queries';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    toast: toastSlice,
    loader: loaderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      announcementApi.middleware,
    ),
});

export default store;
