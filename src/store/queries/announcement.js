import { apis } from '../../constants/apis';
import { baseApi } from '.';

export const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: (year) => ({
        url: apis.announcement.get,
        method: 'GET',
        params: year ? { search: year } : {},
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAnnouncementsQuery } = announcementApi;
