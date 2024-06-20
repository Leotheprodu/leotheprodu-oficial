import {
  useQuery,
  useMutation,
  type UseQueryResult,
} from '@tanstack/react-query';
import { fetchAPI } from '@chore/utils/fetchAPI';
import { client } from '@chore/config/tanstack';

export const fetchData = (key: string, url: string): UseQueryResult => {
  return useQuery(
    {
      queryKey: [key],
      queryFn: () => fetchAPI({ url }),
    },
    client
  );
};

export const postData = ({
  key,
  url,
  method = 'POST',
  isFormData,
}: {
  key: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  isFormData?: boolean;
}) => {
  return useMutation(
    {
      mutationKey: [key],
      mutationFn: async (data?: any) => {
        return await fetchAPI({
          url,
          method,
          body: data ?? undefined,
          isFormData,
        });
      },
    },
    client
  );
};
