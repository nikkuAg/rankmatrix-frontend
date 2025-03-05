import { apis } from '@/constants/apis';
import { baseApi } from '.';

export const collegeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollegeFilters: builder.query({}),
    getCollegeData: builder.query({
      query: (req) => ({
        url: apis.college.search,
        method: 'POST',
        body: req,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetCollegeDataQuery,
  useLazyGetCollegeFiltersQuery,
  useGetCollegeDataQuery,
  useGetCollegeFiltersQuery,
} = collegeApi;
