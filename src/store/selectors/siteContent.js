import { useGetSiteContentsQuery } from '@/store/queries/siteContent';

export const useSiteContent = () => {
  return useGetSiteContentsQuery(undefined, {
    selectFromResult: (result) => {
      return result.data;
    },
  });
};
