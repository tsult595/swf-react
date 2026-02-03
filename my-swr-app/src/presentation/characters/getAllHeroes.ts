import useSWR from "swr";
import { CharactersUseCases } from "../../Domain";

export function useGetAllHeroes(userId?: string) {
    return useSWR(
        userId ? `all-heroes-${userId}` : 'all-heroes',
        () => CharactersUseCases.getAllHeroesUseCase(userId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}
