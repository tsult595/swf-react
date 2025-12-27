// src/Domain/usecases/getUserFavoritesUseCase.ts
import { favoritesRepository } from '../../../data/api/favoritesRepository';

export const removeFromFavoritesUseCase = (
  userId: string,
  heroId: number
) => {
  return favoritesRepository.remove(userId, heroId);
};