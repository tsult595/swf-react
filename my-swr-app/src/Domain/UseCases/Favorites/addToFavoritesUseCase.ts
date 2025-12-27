// src/Domain/usecases/addToFavoritesUseCase.ts
import { favoritesRepository } from '../../../data/api/favoritesRepository';

export const getUserFavoritesUseCase = (userId: string) => {
  return favoritesRepository.getFavorites(userId);
};;