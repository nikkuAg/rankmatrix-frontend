import { configureStore } from '@reduxjs/toolkit';

import { siteContentApi } from './queries/siteContent';
import loaderSlice from './slices/loader';
import toastSlice from './slices/toast';
import { baseApi } from './queries';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [siteContentApi.reducerPath]: siteContentApi.reducer,
    toast: toastSlice,
    loader: loaderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      siteContentApi.middleware,
    ),
});

export default store;
