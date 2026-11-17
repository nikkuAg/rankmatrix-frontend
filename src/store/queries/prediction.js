import { apis } from '@/constants/apis';
import { programmeExam } from '@/utils/choices.mjs';
import { mergePredictionRows, predictionRequests } from '@/utils/predictorSelections.mjs';
import { baseApi } from '.';

export const predictionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getpredictionData: builder.query({
      // Takes the predictor form data. Requests run one after another because the base query
      // cancels an in-flight request to the same endpoint.
      queryFn: async (formData, _api, _extraOptions, baseQuery) => {
        const responses = [];
        for (const body of predictionRequests(formData)) {
          const result = await baseQuery({ url: apis.prediction.college, method: 'POST', body });
          if (result.error) return { error: result.error };
          responses.push(result.data ?? []);
        }
        return {
          data: mergePredictionRows(
            responses,
            (row) => programmeExam(row.institute) === 'JEE Advanced',
          ),
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetpredictionDataQuery, useGetpredictionDataQuery } = predictionApi;
