
import useSWR from "swr"
import { FavoritesUseCases } from "../../Domain"
import type { Hero } from "../../Domain/Entities/HeroTypes"

export const useGetFavorites = (userId: string) => {
  return useSWR<Hero[]>(
    userId ? `/favorites/${userId}` : null,  // Синхронизируем ключ с useFavorites
    () => FavoritesUseCases.getUserFavoritesUseCase(userId),
     {
      fallbackData: [],
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
};