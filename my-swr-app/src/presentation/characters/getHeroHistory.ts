import useSWR from 'swr';
import { getHeroHistoryUseCase } from '../../Domain/characters';
import type { LotHistory } from '../../Domain/Entities/HeroTypes';

export function useGetHeroHistory(heroId: number | undefined) {
    return useSWR<LotHistory[]>(
        heroId ? `/heroes/${heroId}/history` : null,
        () => getHeroHistoryUseCase(heroId!),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}