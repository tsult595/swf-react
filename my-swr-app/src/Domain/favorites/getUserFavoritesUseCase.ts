import { FavoriteRepository } from '../../data';

export const getUserFavoritesUseCase = (userId: string) => {
  return FavoriteRepository.getUserFavorites(userId);
};