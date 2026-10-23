import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createApi } from '@reduxjs/toolkit/query';
import { createAppStore } from '../src/store/createStore.mjs';

test('injected endpoints share cache, invalidate correctly and process actions once', async () => {
  let calls = 0;
  const api = createApi({
    reducerPath: 'testApi',
    baseQuery: async () => ({ data: { version: ++calls } }),
    tagTypes: ['Catalogue'],
    keepUnusedDataFor: 0,
    endpoints: () => ({}),
  });
  const readApi = api.injectEndpoints({
    endpoints: (builder) => ({
      catalogue: builder.query({ query: () => 'catalogue', providesTags: ['Catalogue'] }),
    }),
  });
  const writeApi = api.injectEndpoints({
    endpoints: (builder) => ({
      refresh: builder.mutation({ query: () => 'refresh', invalidatesTags: ['Catalogue'] }),
    }),
  });
  assert.equal(readApi, writeApi);
  const middleware = api.middleware;
  let probeVisits = 0;
  const instrumented = {
    ...api,
    middleware: (store) => {
      const nextMiddleware = middleware(store);
      return (next) => {
        const handle = nextMiddleware(next);
        return (action) => {
          if (action.type === 'test/probe') probeVisits++;
          return handle(action);
        };
      };
    },
  };
  const store = createAppStore({ api: instrumented });
  store.dispatch({ type: 'test/probe' });
  assert.equal(probeVisits, 1);
  const subscription = store.dispatch(readApi.endpoints.catalogue.initiate());
  assert.equal((await subscription.unwrap()).version, 1);
  await store
    .dispatch(readApi.endpoints.catalogue.initiate(undefined, { subscribe: false }))
    .unwrap();
  assert.equal(calls, 1); // Another endpoint module uses the same cached result.
  await store.dispatch(writeApi.endpoints.refresh.initiate()).unwrap();
  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));
  assert.equal(calls, 3); // Mutation plus exactly one invalidation refetch.
  assert.equal(readApi.endpoints.catalogue.select()(store.getState()).data.version, 3);
  subscription.unsubscribe();
  store.dispatch(api.util.resetApiState());
});
