import useSWR from 'swr';
import { fetcher } from '../../utils/ApiFetcher';
import type { LotHistory } from '../../Domain/Entities/HeroTypes';

export function useGetHeroHistory(heroId: number | undefined) {
    return useSWR<LotHistory[]>(
        heroId ? `/heroes/${heroId}/history` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}