// src/Domain/usecases/getUserFavoritesUseCase.ts
import { getUserFavorites } from '../../../data/api/favoritesApi';
import type { Hero } from '../../Entities/HeroTypes';

export const getUserFavoritesUseCase = async (userId: string): Promise<Hero[]> => {
  return await getUserFavorites(userId);
};