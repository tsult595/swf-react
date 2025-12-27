// presenter/useFavorites.ts
import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { toggleFavoriteUseCase } from '../../Domain/UseCases/Favorites/toggleFavorite';
import { getUserFavoritesUseCase } from '../../Domain/UseCases/Favorites/addToFavoritesUseCase';

export const useFavorites = (userId: string) => {
  const { data: favorites = [], isLoading, mutate } = useSWR<Hero[]>(
    userId ? `/favorites/${userId}` : null,
    () => getUserFavoritesUseCase(userId),
    { fallbackData: [], revalidateOnFocus: false }
  );

  const toggleFavorite = async (hero: Hero, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const isCurrentlyFavorite = favorites.some(f => f.id === hero.id);

    const optimisticFavorites = isCurrentlyFavorite
      ? favorites.filter(f => f.id !== hero.id)
      : [...favorites, hero];

    mutate(optimisticFavorites, false);

    try {
      await toggleFavoriteUseCase(userId, hero, isCurrentlyFavorite);
      mutate();
    } catch {
      mutate(); // rollback
    }
  };

  const isFavorite = (heroId: string | number) => favorites.some(f => f.id === heroId);

  return { favorites, isLoading, toggleFavorite, isFavorite };
};
