import useSWR from "swr";
import { HeroesUseCases } from "../../Domain";

export function useGetAllHeroes(userId?: string) {
    return useSWR(
        userId ? `all-heroes-${userId}` : 'all-heroes',
        () => HeroesUseCases.getAllHeroesUseCase(userId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}
