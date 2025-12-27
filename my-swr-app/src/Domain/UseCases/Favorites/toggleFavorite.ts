// domain/useCases/toggleFavorite.ts
import { Hero } from '../entities/Hero';
import { favoritesRepository } from '../../data/favoritesRepository';

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
