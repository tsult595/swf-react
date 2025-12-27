// domain/useCases/toggleFavorite.ts
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import { favoritesRepository } from '../../../data/api/favoritesRepository';

export const toggleFavoriteUseCase = async (
  userId: string,
  hero: Hero,
  isCurrentlyFavorite: boolean
) => {
  if (isCurrentlyFavorite) {
    await favoritesRepository.remove(userId, hero.id);
    return { type: 'removed' as const };
  }

  await favoritesRepository.add(userId, hero.id);
  return { type: 'added' as const };
};
