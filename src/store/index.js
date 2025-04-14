import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './queries';
import { branchApi } from './queries/branch';
import { collegeApi } from './queries/college';
import { predictionApi } from './queries/prediction';
import { rankApi } from './queries/rank';
import { seatApi } from './queries/seats';
import { siteContentApi } from './queries/siteContent';
import branchReducer from './slices/branch';
import collegeReducer from './slices/college';
import loaderReducer from './slices/loader';
import rankReducer from './slices/rank';
import seatReducer from './slices/seats';
import toastReducer from './slices/toast';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [siteContentApi.reducerPath]: siteContentApi.reducer,
    [collegeApi.reducerPath]: collegeApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [seatApi.reducerPath]: seatApi.reducer,
    [rankApi.reducerPath]: rankApi.reducer,
    [predictionApi.reducerPath]: predictionApi.reducer,
    toast: toastReducer,
    loader: loaderReducer,
    college: collegeReducer,
    branch: branchReducer,
    seat: seatReducer,
    rank: rankReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      siteContentApi.middleware,
      collegeApi.middleware,
      branchApi.middleware,
      seatApi.middleware,
      rankApi.middleware,
      predictionApi.middleware,
    ),
});

export default store;
