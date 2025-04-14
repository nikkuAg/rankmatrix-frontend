import { apis } from '@/constants/apis';
import { baseApi } from '.';

export const predictionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getpredictionData: builder.query({
      query: (req) => ({
        url: apis.prediction.college,
        method: 'POST',
        body: req,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetpredictionDataQuery, useGetpredictionDataQuery } = predictionApi;
