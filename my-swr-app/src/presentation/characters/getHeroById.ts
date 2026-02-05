import useSWR from 'swr';

import {CharactersUseCases } from '../../Domain';

export function useGetHeroById(heroId: number | null) {
    return useSWR(
        heroId ? `hero-${heroId}` : null,
        () => CharactersUseCases.getHeroByIdUseCase(heroId as number)
    );
}