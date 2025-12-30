
import useSWR from "swr"
import { FavoritesUseCases } from "../../Domain"

export const useGetFavorites = (userId: string) => {
  return useSWR(
    userId ? `getFavorites-${userId}` : null,  // Лучший ключ, без русского
    () => FavoritesUseCases.getUserFavoritesUseCase(userId)  // Без лишнего await
  );
};