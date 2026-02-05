import useSWR from 'swr';

import {CharactersUseCases } from '../../Domain';

export function useGetCharacterById(heroId: number | null) {
    return useSWR(
        heroId ? `hero-${heroId}` : null,
        () => CharactersUseCases.getCharacterByIdUseCase(heroId as number)
    );
}