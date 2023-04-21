import { Course } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useClasses = () => {
  const { data, isLoading, error } = useSWR<{ classes: Course[] }>(
    '/api/classes',
    fetcher
  );

  return {
    classes: data?.classes,
    isLoading,
    isError: error,
  };
};

export default useClasses;
