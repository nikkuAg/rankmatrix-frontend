import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { apis } from '@/constants/apis';
import { openToast } from '@/store/slices/toast';

const baseQuery = fetchBaseQuery({
  baseUrl: apis.BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');

    return headers;
  },
});

const controllers = new Map();

const requestInterceptor = async (args, api, extraOptions) => {
  if (controllers.has(api.endpoint)) {
    controllers.get(api.endpoint).abort();
  }

  // Create new AbortController for the latest request
  const abortController = new AbortController();
  controllers.set(api.endpoint, abortController);

  if (args && typeof args === 'object') {
    if (args.params) {
      args.params = decamelizeKeys(args.params);
    }

    if (args.body) {
      args.body = decamelizeKeys(args.body);
    }
  }

  args.signal = abortController.signal;

  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    result.data = camelizeKeys(result.data);
  }
  if (result.error) {
    api.dispatch(
      openToast({
        type: 'error',
        message:
          result.error.data.message ||
          result.error.data ||
          'Something went wrong. Please try again.',
      }),
    );
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: requestInterceptor,
  endpoints: () => ({}),
});
