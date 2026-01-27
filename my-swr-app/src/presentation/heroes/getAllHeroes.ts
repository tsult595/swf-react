import useSWR from "swr";
import { HeroesUseCases } from "../../Domain";

export function useGetAllHeroes() {
    return useSWR('all-heroes', () => HeroesUseCases.getAllHeroesUseCase(), {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
    });
}
