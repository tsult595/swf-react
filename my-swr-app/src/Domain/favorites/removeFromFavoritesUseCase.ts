
import { FavoriteRepository } from '../../data';

export const removeFromFavoritesUseCase = (
  userId: string,
  heroId: number
) => {
  return  FavoriteRepository.removeFromFavorites(userId, heroId);
};
