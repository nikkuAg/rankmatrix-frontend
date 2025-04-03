import { apis } from '@/constants/apis';
import { baseApi } from '.';

export const rankApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRankFilters: builder.query({
      query: () => ({
        url: apis.rank.filter,
        method: 'GET',
      }),
    }),
    getRankData: builder.query({
      query: (req) => ({
        url: apis.rank.search,
        method: 'POST',
        body: req,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetRankDataQuery,
  useLazyGetRankFiltersQuery,
  useGetRankDataQuery,
  useGetRankFiltersQuery,
} = rankApi;
