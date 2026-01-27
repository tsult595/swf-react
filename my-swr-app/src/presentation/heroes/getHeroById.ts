import useSWR from 'swr';

import { HeroesUseCases } from '../../Domain';

export function useGetHeroById(heroId: number | null) {
    return useSWR(
        heroId ? `hero-${heroId}` : null,
        () => HeroesUseCases.getHeroByIdUseCase(heroId as number)
    );
}