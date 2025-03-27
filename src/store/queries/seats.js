import { apis } from '@/constants/apis';
import { baseApi } from '.';

export const seatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeatFilters: builder.query({
      query: () => ({
        url: apis.seat.filter,
        method: 'GET',
      }),
    }),
    getSeatData: builder.query({
      query: (req) => ({
        url: apis.seat.search,
        method: 'POST',
        body: req,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetSeatDataQuery,
  useLazyGetSeatFiltersQuery,
  useGetSeatDataQuery,
  useGetSeatFiltersQuery,
} = seatApi;
