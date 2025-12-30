
import { FavoriteRepository } from '../../data';


export const addToFavoritesUseCase = (userId: string, heroId: number) => {
  return FavoriteRepository.addToFavorites(userId, heroId);
};