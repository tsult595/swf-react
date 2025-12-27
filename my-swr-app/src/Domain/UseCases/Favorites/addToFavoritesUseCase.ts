// src/Domain/usecases/addToFavoritesUseCase.ts
import { addToFavorites } from '../../../data/api/favoritesApi';

export const addToFavoritesUseCase = async (userId: string, heroId: number) => {
  return await addToFavorites(userId, heroId);
};