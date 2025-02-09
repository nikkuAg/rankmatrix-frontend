import { configureStore } from '@reduxjs/toolkit';

import { announcementApi } from './queries/announcement';
import announcementSlice from './slices/announcement';
import toastSlice from './slices/toast';
import { baseApi } from './queries';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    toast: toastSlice,
    announcement: announcementSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      announcementApi.middleware,
    ),
});

export default store;
