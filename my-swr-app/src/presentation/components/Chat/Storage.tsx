// import styled, { css } from 'styled-components';
// import { useState, useEffect , useRef} from 'react';
// import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
// import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
// import { Send, Scroll } from 'lucide-react';
// import AsideBackGround from '../../../assets/auction_menu_background.png';
// import HeaderBackGround from '../../../assets/page_header_background.png';
// // import { io, Socket } from 'socket.io-client';
// import { generatePersonalizedUserId } from '../../../utils/userId';
// // import type { Message } from '../../../Domain/Entities/MessageTypes';
// import { useChatSocket } from '../../hooks/useChatSocket';




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

// const MessagesContainer = styled.div`
//   flex: 1;
//   overflow-y: auto;
//   background-image: url(${AsideBackGround});
//   height: auto;
//   padding: 20px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   min-height: 0;
  
//   &::-webkit-scrollbar {
//     width: 12px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(45, 24, 16, 0.5);
//     border-radius: 10px;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: linear-gradient(180deg, #8b4513 0%, #654321 100%);
//     border-radius: 10px;
//     border: 2px solid #d4af37;
    
//     &:hover {
//       background: linear-gradient(180deg, #d4af37 0%, #8b4513 100%);
//     }
//   }
// `;

// const MessageWrapper = styled.div<{ $isOwn?: boolean; $type?: string }>`
//   display: flex;
//   flex-direction: column;
//   align-items: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
//   animation: fadeIn 0.3s ease-in;
//   flex-shrink: 0;
//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//       transform: translateY(10px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// const MessageBubble = styled.div<{ $isOwn?: boolean; $type?: string }>`
//   background: ${props => props.$isOwn
//     ? 'linear-gradient(135deg, #37433dff 0%, #2f684dff 100%)'
//     : 'linear-gradient(135deg, #744210 0%, #d43f3f 100%)'}; // <-- изменённый цвет для чужих сообщений
//   border: 2px solid ${props => props.$isOwn ? '#585f3eff' : '#d43f3f'};
//   border-radius: ${props => props.$isOwn ? '15px 15px 0 15px' : '15px 15px 15px 0'};
//   padding: 12px 18px;
//   max-width: 60%;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
//   position: relative;
  
//   &::before {
//     content: '';
//     position: absolute;
//     width: 0;
//     height: 0;
//     border-style: solid;
//     ${props => props.$isOwn ? `
//       right: -10px;
//       bottom: 0;
//       border-width: 0 0 10px 10px;
//       border-color: transparent transparent #545337ff transparent;
//     ` : `
//       left: -10px;
//       bottom: 0;
//       border-width: 0 10px 10px 0;
//       border-color: transparent #5a3410 transparent transparent;
//     `}
//   }
// `;

// const MessageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-bottom: 5px;
// `;

// const Username = styled.span<{ $type?: string }>`
//   font-weight: bold;
//   color: #8e8346ff;
//   font-size: 14px;
//   text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
// `;

// const MessageText = styled.p`
//   color: #f7fafc;
//   margin: 0;
//   font-size: 15px;
//   line-height: 1.5;
//   word-wrap: break-word;
// `;

// const Timestamp = styled.span`
//   color: rgba(255, 255, 255, 0.5);
//   font-size: 11px;
//   margin-top: 4px;
//   font-family: 'Arial', sans-serif;
// `;

// const InputContainer = styled.div`
//   flex-shrink: 0;
//   background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
//   border: 3px solid #2f2e2aff;
//   border-radius: 0 0 10px 10px;
//   padding: 15px 20px;
//   display: flex;
//   background-image: url(${HeaderBackGround});
//   gap: 10px;
//   box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.5);
// `;

// const Input = styled.input`
//   flex: 1;
//   background: rgba(26, 20, 16, 0.8);
//   border: 2px solid #252524ff;
//   border-radius: 8px;
//   padding: 12px 18px;
//   color: #f7fafc;
//   font-size: 15px;
//   outline: none;
//   transition: all 0.3s;
  
//   &::placeholder {
//     color: rgba(212, 175, 55, 0.5);
//   }
  
//   &:focus {
//     border-color: #ffd700;
//     box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
//   }
// `;

// const SendButton = styled.button`
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
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 12px rgba(212, 175, 55, 0.4);
//     background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }
// `;

// const PrivateButton = styled.button`
//   width: 25px;
//   height: 25px;
//   margin-left: 16px;
//   background: #dfa7a7ff;
//   border-radius: 15%;
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

// const SelectedSpan = styled.span`
//   color: #ffd700;
//   margin-right: 12px;
//   margin-top: 10px;
  
// `;

// const MainComponentChat = () => {
//   const [currentUserId, setCurrentUserId] = useState<string>('');
//   const currentUsername = 'Tima';
//   const { chatMessages, userMessages, clanMessages, sendChatMessage, sendUserMessage, sendClanMessage } = useChatSocket(currentUserId, currentUsername);
//   const [inputValue, setInputValue] = useState('');
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null);
//   const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
//   const [clanChatId, setClanChatId] = useState<string | null>(null); // id или имя клана
//   const [clanName, setClanName] = useState<string | null>(null);
  


// const handleSendMessage = () => {
//   if (!inputValue.trim()) return;
//   if (clanChatId) {
//     sendClanMessage(inputValue, clanChatId);
//   } else if (selectedRecipientId) {
//     sendUserMessage(inputValue, selectedRecipientId);
//   } else {
//     sendChatMessage(inputValue);
//   }
//   setInputValue('');
// };

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
 
//  useEffect(() => {
//   const container = messagesContainerRef.current;
//   if (container) {
//     container.scrollTop = container.scrollHeight;
//   }
// }, [chatMessages, userMessages, clanMessages, selectedRecipientId, clanChatId]);


//   return (
//     <>
//       <ChatContainer>
//         <ChatHeader>
//           <Scroll size={28} color="#665d3fff" />
//           <CreateGroupButton onClick={() => setIsModalOpen(true)}>
//             Создать свой клан
//           </CreateGroupButton>
//           <CreateGroupButton onClick={() => setIsModifyModalOpen(true)}>
//             Мой клан  
//           </CreateGroupButton>
//           <h2>Chat</h2>
//         </ChatHeader>

//         <MessagesContainer ref={messagesContainerRef}>
//           {selectedRecipientId
//             ? userMessages
//            .filter(
//              m =>
//         (m.userId === currentUserId && m.recipientId === selectedRecipientId) ||
//         (m.userId === selectedRecipientId && m.recipientId === currentUserId)
//             )
//                 .map((message) => {
//                   const isOwn = message.userId === currentUserId;
//                   return (
//                     <MessageWrapper key={message.id} $isOwn={isOwn}>
//                       <MessageBubble $isOwn={isOwn}>
//                         <MessageHeader>
//                           <Username
//                             $type={message.userId}
//                             style={{
//                               cursor: !clanChatId && message.userId !== currentUserId ? 'pointer' : 'default',
//                               textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
//                               color: selectedRecipientId === message.userId ? '#ffd700' : undefined
//                             }}
//                             onClick={() => {
//                               if (!clanChatId && message.userId !== currentUserId) {
//                                 setSelectedRecipientId(
//                                   selectedRecipientId === message.userId ? null : message.userId
//                                 );
//                               }
//                             }}
//                           >
//                             {message.userId}
//                             <span style={{ marginLeft: 4, color: '#ffd700', fontSize: 12 }}>(private)</span>
//                           </Username>
//                           <Timestamp>
//                             {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })}
//                           </Timestamp>
//                         </MessageHeader>
//                         <MessageText>{message.text}</MessageText>
//                       </MessageBubble>
//                     </MessageWrapper>
//                   );
//                 })
//             : clanChatId
//             ? clanMessages
//                 .filter((m) => m.recipientId === clanChatId)
//                 .map((message) => {
//                   const isOwn = message.userId === currentUserId;
//                   return (
//                     <MessageWrapper key={message.id} $isOwn={isOwn}>
//                       <MessageBubble $isOwn={isOwn}>
//                         <MessageHeader>
//                           <Username
//                             $type={message.userId}
//                             style={{
//                               cursor: !clanChatId && message.userId !== currentUserId ? 'pointer' : 'default',
//                               textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
//                               color: selectedRecipientId === message.userId ? '#ffd700' : undefined
//                             }}
//                             onClick={() => {
//                               if (!clanChatId && message.userId !== currentUserId) {
//                                 setSelectedRecipientId(
//                                   selectedRecipientId === message.userId ? null : message.userId
//                                 );
//                               }
//                             }}
//                           >
//                             {message.userId}
//                             <span style={{ marginLeft: 4, color: '#00e676', fontSize: 12 }}>(clan)</span>
//                           </Username>
//                           <Timestamp>
//                             {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })}
//                           </Timestamp>
//                         </MessageHeader>
//                         <MessageText>{message.text}</MessageText>
//                       </MessageBubble>
//                     </MessageWrapper>
//                   );
//                 })
//             : chatMessages.map((message) => {
//                 const isOwn = message.userId === currentUserId;
//                 const isPrivate = message.type === 'private';
//                 const isClan = message.type === 'clanChat';
//                 return (
//                   <MessageWrapper key={message.id} $isOwn={isOwn}>
//                     <MessageBubble $isOwn={isOwn}>
//                       <MessageHeader>
//                         <Username
//                           $type={message.userId}
//                           style={{
//                             cursor: !clanChatId && message.userId !== currentUserId ? 'pointer' : 'default',
//                             textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
//                             color: selectedRecipientId === message.userId ? '#ffd700' : undefined
//                           }}
//                           onClick={() => {
//                             if (!clanChatId && message.userId !== currentUserId) {
//                               setSelectedRecipientId(
//                                 selectedRecipientId === message.userId ? null : message.userId
//                               );
//                             }
//                           }}
//                         >
//                           {message.userId}
//                           {isPrivate && (
//                             <span style={{ marginLeft: 4, color: '#ffd700', fontSize: 12 }}>
//                               (private)
//                             </span>
//                           )}
//                           {isClan && (
//                             <span style={{ marginLeft: 4, color: '#00e676', fontSize: 12 }}>
//                               (clan)
//                             </span>
//                           )}
//                         </Username>
//                         <Timestamp>
//                           {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
//                             hour: '2-digit',
//                             minute: '2-digit',
//                           })}
//                         </Timestamp>
//                       </MessageHeader>
//                       <MessageText>{message.text}</MessageText>
//                     </MessageBubble>
//                   </MessageWrapper>
//                 );
//               })}
//         </MessagesContainer>

//         <InputContainer>
//           {clanChatId ? (
//             <SelectedSpan>
//               Клановый чат: {clanName || clanChatId}
//               <PrivateButton onClick={() => { setClanChatId(null); setClanName(null); }}>X</PrivateButton>
//             </SelectedSpan>
//           ) : selectedRecipientId && (
//             <SelectedSpan>
//               Приватный чат с: {selectedRecipientId}
//               <PrivateButton onClick={() => setSelectedRecipientId(null)}>X</PrivateButton>
//             </SelectedSpan>
//           )}
//           <Input
//             type="text"
//             placeholder={
//               clanChatId
//                 ? `Клановый чат: ${clanChatId}`
//                 : selectedRecipientId
//                   ? `Приватно для ${selectedRecipientId}`
//                   : 'Введите сообщение...'
//             }
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyUp={handleKeyPress}
//           />
//           <SendButton onClick={handleSendMessage}>
//             <Send size={18} />
//             Отправить
//           </SendButton>
//         </InputContainer>
//       </ChatContainer>
//       {isModalOpen && (
//         <ChatModalComponent
//           onClose={() => setIsModalOpen(false)}
//           onCreateClan={(createdClanName) => {
//             setClanChatId(createdClanName);
//             setSelectedRecipientId(null);
//             setIsModalOpen(false);
//           }}
//         />
//       )}
//       {isModifyModalOpen && (
//         <ChatModifyComponentModul
//           userId={currentUserId}
//           onClose={() => setIsModifyModalOpen(false)}
//           onOpenChat={({ clanId, clanName }) => {
//             setClanChatId(clanId);
//             setClanName(clanName);
//             setIsModifyModalOpen(false);
//             setSelectedRecipientId(null);
//           }}
//         />
//       )}
//     </>
//   )
// };

// export default MainComponentChat;