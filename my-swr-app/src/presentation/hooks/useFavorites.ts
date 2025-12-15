
import useSWR, { mutate as globalMutate } from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import { 
  addToFavorites, 
  removeFromFavorites, 
  getUserFavorites 
} from '../../data/api/favoritesApi';

export const useFavorites = (userId: string) => {
  const { 
    data: favorites = [], 
    isLoading, 
    mutate 
  } = useSWR<Hero[]>(
    userId ? `/favorites/${userId}` : null,
    () => getUserFavorites(userId),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
      fallbackData: [],
    }
  );

  const toggleFavorite = async (hero: Hero, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const currentFavorites = favorites || [];
    const isFavorite = currentFavorites.some(fav => fav.id === hero.id);

    try {
      if (isFavorite) {
        const newFavorites = currentFavorites.filter(fav => fav.id !== hero.id);
        mutate(newFavorites, false);
        globalMutate(`/favorites/${userId}`, newFavorites, false);

        await removeFromFavorites(userId, hero.id);
        console.log(`Removed ${hero.name} from favorites`);
      } else {
        const newFavorites = [...currentFavorites, hero];
        mutate(newFavorites, false);
        globalMutate(`/favorites/${userId}`, newFavorites, false);

        await addToFavorites(userId, hero.id);
        console.log(`Added ${hero.name} to favorites`);
      }

    
      mutate();
      globalMutate(`/favorites/${userId}`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      mutate(); 
      globalMutate(`/favorites/${userId}`);
    }
  };

  const isFavorite = (heroId: number) => {
    return favorites.some(hero => hero.id === heroId);
  };


  

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
  };
};