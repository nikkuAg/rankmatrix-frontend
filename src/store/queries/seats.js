import { baseApi } from '.';

export const seatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeatFilters: builder.query({}),
    getSeatData: builder.query({}),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetSeatDataQuery,
  useLazyGetSeatFiltersQuery,
  useGetSeatDataQuery,
  useGetSeatFiltersQuery,
} = seatApi;
