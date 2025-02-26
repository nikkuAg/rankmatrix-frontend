import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './queries';
import { collegeApi } from './queries/college';
import { siteContentApi } from './queries/siteContent';
import collegeReducer from './slices/college';
import loaderReducer from './slices/loader';
import toastReducer from './slices/toast';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [siteContentApi.reducerPath]: siteContentApi.reducer,
    [collegeApi.reducerPath]: collegeApi.reducer,
    toast: toastReducer,
    loader: loaderReducer,
    college: collegeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      siteContentApi.middleware,
      collegeApi.middleware,
    ),
});

export default store;
