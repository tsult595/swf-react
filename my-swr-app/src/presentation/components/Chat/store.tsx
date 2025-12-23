// import styled, { css } from 'styled-components';
// import { useState, useEffect , useRef } from 'react';
// import { getClansByUserId } from '../../../data/api/clanApi';
// import { getAllClanMessages, getAllPrivateMessages } from '../../../data/api/messageApi';
// import {  Scroll } from 'lucide-react';
// // import AsideBackGround from '../../../assets/auction_menu_background.png';
// import HeaderBackGround from '../../../assets/page_header_background.png';
// // import { io, Socket } from 'socket.io-client';
// import { generatePersonalizedUserId } from '../../../utils/userId';
// // import type { Message } from '../../../Domain/Entities/MessageTypes';
// import { useChatSocket } from '../../hooks/useChatSocket';
// import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
// import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
// // import Swal from 'sweetalert2';import useSWR from 'swr';
// // import { getAllClans } from '../../../data/api/clanApi';
// import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
// import MainChatMessagesContainer from './MainChatMessagesContainer';
// import MainChatInputContainer from './MainChatInputContainer';






// const FrameBorderModalMain = css`
//   border-style: solid;
//   border-image-width: 40px;
//   border-image-source: url('/assets/frame_16_background.png');
//   border-image-slice: 40 fill;
//   border-image-repeat: round;
// `;

// const ChatContainer = styled.div`
//   width: 100%;
//   height: 85%;
//   display: flex;
//   flex-direction: column;
//   font-family: 'Cinzel', serif;
 
//   ${FrameBorderModalMain}
//   padding: 20px;
 
// `;

// const ChatHeader = styled.div`
//   background-image: url(${HeaderBackGround});
//   border: 3px solid #57503aff;
//   border-radius: 10px 10px 0 0;
//   padding: 15px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 15px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  
//   h2 {
//     color: #d4af37;
//     margin: 0;
//     font-size: 24px;
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
//     letter-spacing: 2px;
//   }
// `;



// const CreateGroupButton = styled.button`
//   background: linear-gradient(135deg, #d4af37 0%, #b8941e 100%);
//   border: 2px solid #ffd700;
//   border-radius: 8px;
//   padding: 12px 24px;
//   color: #2d1810;
//   font-weight: bold;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   transition: all 0.3s;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
// `;




// const MainComponentChat = () => {
//   const [currentUserId, setCurrentUserId] = useState<string>('');
//   const currentUsername = 'Tima';
//   const [clanIds, setClanIds] = useState<string[]>([]);
//   const { messages, sendMessage, setMessages } = useChatSocket(currentUserId, currentUsername);
//   // const [inputValue, setInputValue] = useState('');
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null);
//   const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
//   const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId')); // id или имя клана
//   const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
//   // const { data: allClans } = useSWR('http://localhost:3001/api/clans', getAllClans);

//   const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  
//   useEffect(() => {
//   if (clanChatId) {
//     getAllClanMessages(clanChatId).then((msgs) => {
    
//       setMessages((prev) => [...prev, ...msgs.filter(m => !prev.some(p => p.id === m.id))]);
//     });
//   }
// }, [clanChatId]);

// useEffect(() => {
//   if (selectedRecipientId) {
//     getAllPrivateMessages(currentUserId).then((msgs) => {

//       const filtered = msgs.filter(m => m.recipientId === selectedRecipientId || m.userId === selectedRecipientId);
//       setMessages((prev) => [...prev, ...filtered.filter(m => !prev.some(p => p.id === m.id))]);
//     });
//   }
// }, [selectedRecipientId]);

//   useEffect(() => {
//     if (clanChatId) localStorage.setItem('clanChatId', clanChatId);
//     else localStorage.removeItem('clanChatId');
//   }, [clanChatId]);

//   useEffect(() => {
//     if (clanName) localStorage.setItem('clanName', clanName);
//     else localStorage.removeItem('clanName');
//   }, [clanName]);

//   useEffect(() => {
//     if (selectedRecipientId) localStorage.setItem('selectedRecipientId', selectedRecipientId);
//     else localStorage.removeItem('selectedRecipientId');
//   }, [selectedRecipientId]);

//   useEffect(() => {
//     setMessages(prev => prev.filter(msg => {
//       if (msg.type === 'clanChat' && msg.recipientId && !clanIds.includes(msg.recipientId)) return false;
//       return true;
//     }));
//   }, [clanIds]);

// ;



//   useEffect(() => {
//     async function getUserIdAndClans() {
//       let userId = localStorage.getItem('userId');
//       if (!userId) {
//         userId = await generatePersonalizedUserId();
//         localStorage.setItem('userId', userId);
//       }
//       setCurrentUserId(userId);
//       // Получаем кланы пользователя и сохраняем их id
//       try {
//         const clans = await getClansByUserId(userId);
//         const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
//         setClanIds(ids);
//       } catch (e) {
//         console.error('Failed to fetch clans', e);
//         setClanIds([]);
//       }
//     }
//     getUserIdAndClans();
//   }, []);
 
//   useEffect(() => {
//   const container = messagesContainerRef.current;
//   if (container) {
//     container.scrollTop = container.scrollHeight;
//   }
// }, [messages]);

//   useEffect(() => {
//     messages.forEach((msg) => {
//       if (
//         msg.type === 'private' &&
//         msg.recipientId === currentUserId &&
//         msg.text.includes('added to clan') &&
//         !seenNotifications.has(String(msg.id))
//       ) {
//         Swal.fire('Вы были добавлены в клан!');
//         setSeenNotifications((prev) => new Set(prev).add(String(msg.id)));
//         // Refetch clans to update clanIds
//         getClansByUserId(currentUserId).then((clans) => {
//           const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
//           setClanIds(ids);
//         }).catch((e) => console.error('Failed to refetch clans on add', e));
//       }
//     });
//   }, [messages, currentUserId, seenNotifications]);


//   return (
//     <>
//         <ChatHeader>
//           {currentUserId}
//           <Scroll size={28} color="#665d3fff" />
//           <CreateGroupButton onClick={() => setIsModalOpen(true)}>
//             Создать свой клан
//           </CreateGroupButton>
//           <CreateGroupButton onClick={() => setIsModifyModalOpen(true)}>
//             Мой клан  
//           </CreateGroupButton>
//           <h2>Chat</h2>
//         </ChatHeader>
     
//       {isModalOpen && (
//         <ChatModalComponent
//           onClose={() => setIsModalOpen(false)}
//           sendMessage={sendMessage}
//           onCreateClan={async (clanId: string, clanName: string) => {
//             setClanChatId(clanId);
//             setClanName(clanName);
//             setSelectedRecipientId(null);
//             setIsModalOpen(false);
//           }}
//         />
//       )}
//       {isModifyModalOpen && (
//         <ChatModifyComponentModul
//           userId={currentUserId}
//           onClose={() => setIsModifyModalOpen(false)}
//           sendMessage={sendMessage}
//           onClanUpdate={(action?: 'add' | 'remove', clanId?: string) => {
//             if (action === 'remove' && clanId) {
//               setClanIds(prev => prev.filter(id => id !== clanId));
//             } else if (action === 'add' && clanId) {
//               setClanIds(prev => prev.includes(clanId) ? prev : [...prev, clanId]);
//             }
//             getClansByUserId(currentUserId).then((clans) => {
//               const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
//               setClanIds(ids);
//             }).catch((e) => console.error('Failed to refetch clans on update', e));
//           }}
//           onOpenChat={async ({ clanId, clanName }) => {
//             setClanChatId(clanId);
//             setClanName(clanName);
//             setIsModifyModalOpen(false);
//             setSelectedRecipientId(null);
          
//             try {
//               const clans = await getClansByUserId(currentUserId);
//               const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
//               setClanIds(ids);
//             } catch (e) {
//               console.error('Failed to refetch clans', e);
//             }
//           }}
//         />
//       )}
//     </>
//   )
// };

// export default MainComponentChat;



