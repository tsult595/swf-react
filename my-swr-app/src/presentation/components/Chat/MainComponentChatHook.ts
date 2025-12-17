// // hooks/useUserId.ts
// import { useState, useEffect } from 'react';
// import { generatePersonalizedUserId } from '../../../utils/userId';

// export function useUserId() {
//   const [currentUserId, setCurrentUserId] = useState<string>('');

//   useEffect(() => {
//     async function loadUserId() {
//       let userId = localStorage.getItem('userId');
      
//       if (!userId) {
//         userId = await generatePersonalizedUserId();
//         localStorage.setItem('userId', userId);
//       }
      
//       setCurrentUserId(userId);
//     }

//     loadUserId();
//   }, []); // пустой массив — выполнится один раз при монтировании

//   return currentUserId; // возвращаем только ID, или можно объект { userId, isLoading }
// }