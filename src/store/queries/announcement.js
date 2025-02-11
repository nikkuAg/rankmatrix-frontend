import { apis } from '../../constants/apis';
import { baseApi } from '.';

export const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: (year) => ({
        url: apis.announcement.get,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAnnouncementsQuery, useGetAnnouncementsQuery } =
  announcementApi;
