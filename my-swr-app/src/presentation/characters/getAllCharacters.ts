import useSWR from "swr";
import { CharactersUseCases } from "../../Domain";

export function useGetAllCharacters(userId?: string) {
    return useSWR(
        userId ? `all-heroes-${userId}` : 'all-heroes',
        () => CharactersUseCases.getAllCharactersUseCase(userId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000,
        }
    );
}
