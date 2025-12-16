// import { useEffect, useState } from 'react';
// import { generatePersonalizedUserId } from '../../../utils/userId'
// import { sendMessage } from '../../../data/api/messageApi';

// export function MainComponentChatHook() {
//   const [currentUserId, setCurrentUserId] = useState<string>('');
//   const currentUsername = 'Tima';
//   const [inputValue, setInputValue] = useState('');
//   const handleSendMessage = () => {
//   if (!inputValue.trim()) return;
//   sendMessage(inputValue);
//   setInputValue('');
//   };

// const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   if (e.key === 'Enter') {
//     handleSendMessage();
//   }
// };

//   useEffect(() => {
//     async function getUserId() {
//       let userId = localStorage.getItem('userId');
//       if (!userId) {
//         userId = await generatePersonalizedUserId();
//         localStorage.setItem('userId', userId);
//       }
//       setCurrentUserId(userId);
//     }
//     getUserId();
//   }, []);

//   return {
//     currentUserId,
//     currentUsername,
//     inputValue,
//     setInputValue,
//     handleSendMessage,
//     handleKeyPress
//   };
// }