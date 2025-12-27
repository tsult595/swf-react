// src/Domain/usecases/removeFromFavoritesUseCase.ts
import { removeFromFavorites } from '../../../data/api/favoritesApi';

export const removeFromFavoritesUseCase = async (userId: string, heroId: number) => {
  return await removeFromFavorites(userId, heroId);
};