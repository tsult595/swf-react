import useSWR from 'swr';
import { getCharacterHistoryUseCase } from '../../Domain/characters';
import type { LotHistory } from '../../Domain/Entities/CharacterTypes';

export function useGetCharacterHistory(heroId: number | undefined) {
    return useSWR<LotHistory[]>(
        heroId ? `/heroes/${heroId}/history` : null,
        () => getCharacterHistoryUseCase(heroId!),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}