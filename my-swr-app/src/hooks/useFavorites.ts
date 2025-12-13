// import useSWR from 'swr';
// import { getUserFavorites, removeFromFavorites } from '../api/favoritesApi';

// export const useFavorites = (userId: string) => {
//   const { data, mutate, isLoading } = useSWR(
//     `/favorites/${userId}`,
//     () => getUserFavorites(userId),
//     { revalidateOnFocus: false }
//   );

//   const removeFavorite = async (heroId: number) => {
//     await mutate(
//       async (current = []) => {
//         await removeFromFavorites(userId, heroId);
//         return current.filter(h => h.id !== heroId);
//       },
//       {
//         optimisticData: data?.filter(h => h.id !== heroId),
//         rollbackOnError: true,
//         revalidate: false,
//       }
//     );
//   };

//   return {
//     favorites: data,
//     isLoading,
//     removeFavorite,
//   };
// };
