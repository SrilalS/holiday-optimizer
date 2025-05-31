import { useQuery } from '@tanstack/react-query';
import { getAllHolidays } from '@/services/holidays';

/**
 * Hook for fetching public holidays for Sri Lanka for a specific year
 * @param year - The year to fetch holidays for
 */
export const useHolidaysOfSL = (year: number) => {
  return useQuery({
    queryKey: ['holidays', year],
    queryFn: () => getAllHolidays(year),
    enabled: !!year,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
