import { apis } from '@/constants/apis';
import { baseApi } from '.';

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchFilters: builder.query({
      query: () => ({
        url: apis.branch.filter,
        method: 'GET',
      }),
    }),
    getBranchData: builder.query({
      query: (req) => ({
        url: apis.branch.search,
        method: 'POST',
        body: req,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetBranchDataQuery,
  useLazyGetBranchFiltersQuery,
  useGetBranchDataQuery,
  useGetBranchFiltersQuery,
} = branchApi;
