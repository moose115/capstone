import { UserWithRole } from '@/types/user';
import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<{ user: UserWithRole }, string> = (url) =>
  fetch(url).then((res) => res.json());

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<
    { user: UserWithRole },
    string
  >('/api/users/me', fetcher);

  return {
    user: data?.user,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
