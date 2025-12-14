
// import useSWR, { mutate as globalMutate } from 'swr';
// import type { Hero } from '../../Domain/Entities/HeroTypes';
// import { addToFavorites, removeFromFavorites, getUserFavorites } from '../../data/api/favoritesApi';

// export const useFavorites = (userId: string) => {
//   const { data: favorites, isLoading, mutate } = useSWR<Hero[]>(
//     `/favorites/${userId}`,
//     () => getUserFavorites(userId),
//     {
//       revalidateOnFocus: false,
//       refreshInterval: 0,
//     }
//   );

//   const toggleFavorite = async (hero: Hero, e?: React.MouseEvent) => {
//     if (e) e.stopPropagation();
//     const currentFavorites = favorites || [];
//     const isFavorite = currentFavorites.some(fav => fav.id === hero.id);

//     try {
//       if (isFavorite) {
//         // Оптимистично удаляем
//         mutate(currentFavorites.filter(fav => fav.id !== hero.id), false);
//         globalMutate(`/favorites/${userId}`, currentFavorites.filter(fav => fav.id !== hero.id), false);
//         await removeFromFavorites(userId, hero.id);
//       } else {
//         // Оптимистично добавляем
//         mutate([...currentFavorites, hero], false);
//         globalMutate(`/favorites/${userId}`, [...currentFavorites, hero], false);
//         await addToFavorites(userId, hero.id);
//       }
//       // Перезапрашиваем с сервера
//       mutate();
//       globalMutate(`/favorites/${userId}`);
//     } catch (error) {
//       console.error('❌ Error toggling favorite:', error);
//       mutate();
//       globalMutate(`/favorites/${userId}`);
//     }
//   };

//   const isFavorite = (heroId: number) => {
//     return favorites?.some(hero => hero.id === heroId) ?? false;
//   };

//   return {
//     favorites,
//     isLoading,
//     toggleFavorite,
//     isFavorite,
//   };
// };