import { useGetSiteContentsQuery } from "../queries/siteContent";

export const useSiteContent = () => {
  return useGetSiteContentsQuery(undefined, {
    selectFromResult: (result) => {
      return result.data;
    },
  });
};
