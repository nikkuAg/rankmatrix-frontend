import { configureStore } from '@reduxjs/toolkit';

// injectEndpoints augments this same API object. Install its reducer/middleware once,
// regardless of how many modules register endpoints.
export function createAppStore({ api, reducers = {} }) {
  return configureStore({
    reducer: { ...reducers, [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
}
