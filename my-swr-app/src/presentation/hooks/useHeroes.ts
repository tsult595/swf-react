import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { fetcher } from '../../utils/ApiFetcher';

export const useHeroes = () => {
  return useSWR<Hero[]>(
    '/heroes',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
};