// src/presentation/hooks/useFavorites.ts

import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import {  getUserFavoritesUseCase} from '../../Domain/UseCases/Favorites/getUserFavoritesUseCase';
import { addToFavoritesUseCase } from '../../Domain/UseCases/Favorites/addToFavoritesUseCase';
import { removeFromFavoritesUseCase } from '../../Domain/UseCases/Favorites/removeFromFavoritesUseCase';

const fetcher = (userId: string) => getUserFavoritesUseCase(userId);

export const useFavorites = (userId: string) => {
  const { 
    data: favorites = [], 
    isLoading, 
    mutate 
  } = useSWR<Hero[]>(
    userId ? `/favorites/${userId}` : null,
    () => fetcher(userId),
    {
      revalidateOnFocus: false,
      fallbackData: [],
    }
  );

  const toggleFavorite = async (hero: Hero, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const isCurrentlyFavorite = favorites.some(f => f.id === hero.id);

    // Оптимистичный апдейт
    const optimisticFavorites = isCurrentlyFavorite
      ? favorites.filter(f => f.id !== hero.id)
      : [...favorites, hero];

    mutate(optimisticFavorites, false); // false = не ревалидировать сразу

    try {
      if (isCurrentlyFavorite) {
        await removeFromFavoritesUseCase(userId, hero.id);
      } else {
        await addToFavoritesUseCase(userId, hero.id);
      }

      // После успеха — ревалидируем (или просто оставляем optimistic)
      mutate();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      mutate(); // откатываем при ошибке
    }
  };

  const isFavorite = (heroId: number) => favorites.some(h => h.id === heroId);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
  };
};