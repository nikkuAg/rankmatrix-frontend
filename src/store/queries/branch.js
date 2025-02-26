import { baseApi } from '.';

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchFilters: builder.query({}),
    getBranchData: builder.query({}),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetBranchDataQuery,
  useLazyGetBranchFiltersQuery,
  useGetBranchDataQuery,
  useGetBranchFiltersQuery,
} = branchApi;
