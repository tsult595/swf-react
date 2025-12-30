
import { FavoriteRepository } from '../../data';

export const toggleFavoriteUseCase = async (
  userId: string,
  heroId: number,
  isCurrentlyFavorite: boolean
) => {
  if (isCurrentlyFavorite) {
    await FavoriteRepository.removeFromFavorites(userId, heroId);
  } else {
    await FavoriteRepository.addToFavorites(userId, heroId);
  }
};
