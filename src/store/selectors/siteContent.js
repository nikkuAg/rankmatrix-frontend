import { useGetSiteContentsQuery } from '@/store/queries/siteContent';

export const useSiteContent = () => {
  const { data } = useGetSiteContentsQuery();
  return data ?? {};
};
