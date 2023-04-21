import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<Date[], string> = (url) =>
  fetch(url).then((res) => res.json());

const useInPersonDates = () => {
  const { data, isLoading, error } = useSWR('/api/classes/dates', fetcher);

  const dates = data?.map((date) => new Date(date));

  return {
    dates,
    isLoading,
    isError: error,
  };
};

export default useInPersonDates;
