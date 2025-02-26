import { baseApi } from '.';
import { apis } from '../../constants/apis';

export const siteContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiteContents: builder.query({
      query: () => ({
        url: apis.siteContent.get,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetSiteContentsQuery, useGetSiteContentsQuery } = siteContentApi;
