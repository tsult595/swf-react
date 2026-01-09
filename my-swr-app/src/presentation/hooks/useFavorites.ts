import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { toggleFavoriteUseCase } from '../../Domain/favorites/toggleFavoriteUseCase';
import { getUserFavoritesUseCase } from '../../Domain/favorites/getUserFavoritesUseCase';

export type UseFavoritesReturn = {
  favorites: Hero[];
  isLoading: boolean;
  toggleFavorite: (hero: Hero) => Promise<void>;
  isFavorite: (heroId: number) => boolean;
};

export const useFavorites = (userId: string): UseFavoritesReturn => {
  const { data = [], isLoading, mutate } = useSWR<Hero[]>(
    userId ? `/favorites/${userId}` : null,
    () => getUserFavoritesUseCase(userId),
    {
      fallbackData: [],
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const toggleFavorite = async (hero: Hero) => {
    const isCurrentlyFavorite = data.some(f => f.id === hero.id);

    // Optimistic update
    mutate(
      isCurrentlyFavorite
        ? data.filter(f => f.id !== hero.id) // Remove from favorites
        : [...data, hero], // Add to favorites
      false // Don't revalidate immediately
    );

    try {
      await toggleFavoriteUseCase(userId, hero.id, isCurrentlyFavorite);
      // Success - data is already updated optimistically
      // Could add a small delay here if needed for UX
    } catch (error) {
      // Rollback on error
      mutate();
      console.error('Failed to toggle favorite:', error);
      throw error; // Re-throw to let UI handle it
    }
  };

  const isFavorite = (heroId: number) => data.some(f => f.id === heroId);

  return {
    favorites: data,
    isLoading,
    toggleFavorite,
    isFavorite
  };
};
