import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { camelizeKeys, decamelizeKeys } from 'humps';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set('Conetnt-Type', 'application/json');

    return headers;
  },
});

const requestInterceptor = async (args, api, extraOptions) => {
  if (args && typeof args === 'object') {
    if (args.params) {
      args.params = decamelizeKeys(args.params);
    }

    if (args.body) {
      args.body = decamelizeKeys(args.body);
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    result.data = camelizeKeys(result.data);
  }

  if (result.error) {
    // SHOW ALERT TOAST
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: requestInterceptor,
  endpoints: () => ({}),
});
