// import styled, { css } from 'styled-components';
// import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import { addUserToClan , removeUserFromClan , getClansByUserId  } from '../../../data/api/clanApi';
// import { deleteMessageById } from '../../../data/api/messageApi';
// import { generatePersonalizedUserId } from '../../../utils/userId';
// import { useChatSocket } from '../../hooks/useChatSocket';
// import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
// import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
// import Swal from 'sweetalert2';
// import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
// import MainChatMessagesContainer from './MainChatMessagesContainer';
// import MainChatInputContainer from './MainChatInputContainer';
// import MainChatHeader from './MainChatHeader';
// import type { Message } from '../../../Domain/Entities/MessageTypes';
// import { usePublicMessages } from '../../../presentation/public-chat/getAllPublicMessages';
// import { useClanMessages } from '../../../presentation/clan-chat/getAllClanMessages';
// import { usePrivateMessages } from '../../../presentation/private-message/getAllPrivateMessages';
// import { useAllUsers } from '../../all-users/getAllUsers';
// import { useClans } from '../../clans/useClans';


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

// const MainComponentChat = () => {
 
//   const [currentUserId, setCurrentUserId] = useState<string>('');
//   const currentUsername = 'Tima';
//   const [additionalMessages, setAdditionalMessages] = useState<Message[]>([]);
//   const onNewMessage = useCallback((message: Message) => {
//     setAdditionalMessages(prev => {
//       if (message.userId === currentUserId && !message.id.startsWith('temp-')) {
//         return prev;
//       }
//       message.uniqueKey = message.id;

//       if (message.id.startsWith('temp-')) {
//         return [...prev, message];
//       }
//       if (prev.some(m => m.id === message.id)) return prev;

//       return [...prev, message];
//     });
//   }, [currentUserId]);

     
//   const [inputValue, setInputValue] = useState('');
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null);
//   const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
//   const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
//   const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
//   const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());

//   const { users } = useAllUsers();
//   const { clans, refreshClans } = useClans(currentUserId);
  
//   const clanIds = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
//   const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage); 
//   const { messages: publicMessages, isLoading: publicLoading, error: publicError } = usePublicMessages();
//   const { messages: clanMessages, isLoading: clanLoading, error: clanError } = useClanMessages(clanChatId || '');
//   const { messages: privateMessages, isLoading: privateLoading, error: privateError } = usePrivateMessages(currentUserId);

//   // Compute current messages based on mode
//   const baseMessages = useMemo(() => clanChatId ? clanMessages : selectedRecipientId ? privateMessages.filter(m => m.recipientId === selectedRecipientId || m.userId === selectedRecipientId) : publicMessages, [clanChatId, selectedRecipientId, clanMessages, privateMessages, publicMessages]);
//   const relevantAdditionalMessages = useMemo(() => additionalMessages.filter(msg => {
//     if (clanChatId) {
//       return msg.type === 'clanChat' && msg.recipientId === clanChatId;
//     }
//     if (selectedRecipientId) {
//       return msg.type === 'private' && (msg.recipientId === selectedRecipientId || msg.userId === selectedRecipientId);
//     }
//     return msg.type === 'normal';
//   }), [additionalMessages, clanChatId, selectedRecipientId]);
//   const messages = useMemo(() => [...baseMessages, ...relevantAdditionalMessages], [baseMessages, relevantAdditionalMessages]);
  
//   const currentLoading = clanChatId ? clanLoading : selectedRecipientId ? privateLoading : publicLoading;
//   const currentError = clanChatId ? clanError : selectedRecipientId ? privateError : publicError;

//   function handleSendMessage() {
//     if (!inputValue.trim()) return;
//     if (selectedRecipientId) {
//       sendMessage({
//         text: inputValue,
//         recipientId: selectedRecipientId,
//         type: 'private',
//       });
//     } else if (clanChatId) {
//       sendMessage({
//         text: inputValue,
//         recipientId: clanChatId,
//         type: 'clanChat',
//         clanName: clanName || undefined,
//       });
//     } else {
//       sendMessage({
//         text: inputValue,
//         type: 'normal',
//       });
//     }
//     setInputValue('');
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const handleDeleteMessage = async (messageId: string) => {
//     try {
//       await deleteMessageById(messageId);
//       setAdditionalMessages(prev => prev.filter(m => m.id !== messageId));
//     } catch (error) {
//       console.log('Failed to delete message', error);
//       alert('Failed to delete message');
//     }
//   };



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
//     async function getUserIdAndClans() {
//       let userId = localStorage.getItem('userId');
//       if (!userId) {
//         userId = await generatePersonalizedUserId();
//         localStorage.setItem('userId', userId);
//       }
//       setCurrentUserId(userId);
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
//     const container = messagesContainerRef.current;
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [messages]);

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
//         refreshClans();
//       }
//     });
//   }, [messages, currentUserId, seenNotifications, refreshClans]);


//   const handleAddUser = async (clanId: string, userId: string, clanName: string) => {
//     await addUserToClan(clanId, userId);
//     sendMessage({
//       text: `Вы были добавлены в клан ${clanName}!`,
//       recipientId: userId,
//       type: 'private',
//     });
//     refreshClans();
//   };

//   const handleRemoveUser = async (clanId: string, memberId: string) => {
//     await removeUserFromClan(clanId, memberId);
//     refreshClans();
//   };


//    if (currentLoading) return <div>Загрузка сообщений.</div>;
//   if (currentError) return <div style={{ color: 'red' }}>{currentError.message || 'Ошибка загрузки'}</div>;

//   return (
//     <>
//       <ChatContainer>
//         <MainChatHeader
//           onCreateClanClick={() => setIsModalOpen(true)}
//           onModifyClanClick={() => setIsModifyModalOpen(true)}
//           currentUserId={currentUserId}
//           clanName={clanName || undefined}
//         />
//         <MainChatMessagesContainer
//           messages={messages}
//           currentUserId={currentUserId}
//           clanIds={clanIds}
//           clanChatId={clanChatId}
//           selectedRecipientId={selectedRecipientId}
//           clanName={clanName}
//           onDeleteMessage={handleDeleteMessage}
//           onSelectRecipient={setSelectedRecipientId}
//           containerRef={messagesContainerRef}
//         />
//         <MainChatInputContainer
//           inputValue={inputValue}
//           setInputValue={setInputValue}
//           onSendMessage={handleSendMessage}
//           onKeyPress={handleKeyPress}
//           selectedRecipientId={selectedRecipientId}
//           clanChatId={clanChatId}
//           clanName={clanName}
//           onClearSelection={() => {
//             setSelectedRecipientId(null);
//             setClanChatId(null);
//             setClanName(null);
//           }}
//         />
//       </ChatContainer>
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
//           prikolniyText="welcome"
//           users={users}
//         />
//       )}
//       {isModifyModalOpen && (
//         <ChatModifyComponentModul
//           userId={currentUserId}
//           handleAddUser={handleAddUser}
//           handleRemoveUser={handleRemoveUser}
//           onClose={() => setIsModifyModalOpen(false)}
//           sendMessage={sendMessage}
//           onOpenChat={async ({ clanId, clanName }) => {
//             setClanChatId(clanId);
//             setClanName(clanName);
//             setIsModifyModalOpen(false);
//             setSelectedRecipientId(null);
//             refreshClans();
//           }}
//           users={users}
//           clans={clans}
//         />
//       )}
//     </>
//   );
// };

// export default MainComponentChat;


// refreshClans();