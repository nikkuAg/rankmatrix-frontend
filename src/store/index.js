import { createAppStore } from './createStore.mjs';
import { baseApi } from './queries';
import './queries/branch';
import './queries/college';
import './queries/prediction';
import './queries/rank';
import './queries/seats';
import './queries/siteContent';
import branchReducer from './slices/branch';
import collegeReducer from './slices/college';
import rankReducer from './slices/rank';
import seatReducer from './slices/seats';
import toastReducer from './slices/toast';

const store = createAppStore({
  api: baseApi,
  reducers: {
    toast: toastReducer,
    college: collegeReducer,
    branch: branchReducer,
    seat: seatReducer,
    rank: rankReducer,
  },
});

export default store;
