import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { fetcher } from '../../utils/ApiFetcher';

export const useHeroById = (heroId: number | null, fallbackHero?: Hero) => {
  return useSWR<Hero>(
    heroId ? `/heroes/${heroId}` : null,
    fetcher,
    {
      fallbackData: fallbackHero,
      revalidateOnFocus: false,
    }
  );
};