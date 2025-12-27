// favorites/data/favoritesRepository.ts
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { addToFavorites , removeFromFavorites ,getUserFavorites } from './favoritesApi';

export const favoritesRepository = {
  getFavorites(userId: string): Promise<Hero[]> {
    return getUserFavorites(userId);
  },

  add(userId: string, heroId: number): Promise<void> {
    return addToFavorites(userId, heroId);
  },

  remove(userId: string, heroId: number): Promise<void> {
    return removeFromFavorites(userId, heroId);
  },
};
