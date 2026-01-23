import styled from 'styled-components';
import AsideBackGround from '../../../assets/auction_menu_background.png';
import { MessageTypeEnum } from '../../../Domain/Entities/enums/messageEnum';
import { useMessageActions } from '../../message/useMessageActions';
import { useUserId } from '../../hooks/useUserId';
import { useClanIds } from '../../hooks/useClanIds';
import { useRef } from 'react';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { useLoadAllMessages } from '../../hooks/useLoadAllMessages';
import { usePrivateMessages } from '../../hooks/usePrivateMessages';
import { useClanMessages } from '../../hooks/useClanMessages';
import useSWR from 'swr';
import { useClanChat } from '../../hooks/useClanChat';
import { useMessageChat } from '../../hooks/useMessageChat';
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-image: url(${AsideBackGround});
  height: auto;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 0;
  
  &::-webkit-scrollbar {
    width: 12px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(45, 24, 16, 0.5);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #8b4513 0%, #654321 100%);
    border-radius: 10px;
    border: 2px solid #d4af37;
    
    &:hover {
      background: linear-gradient(180deg, #d4af37 0%, #8b4513 100%);
    }
  }
`;

const SkeletonMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const SkeletonUsername = styled.div`
  width: 80px;
  height: 14px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;

const SkeletonTimestamp = styled.div`
  width: 60px;
  height: 11px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;

const SkeletonText = styled.div`
  width: 200px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-bottom: 4px;

  &:nth-child(2) {
    width: 150px;
  }
`;

const LoadingSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <SkeletonMessage key={i}>
        <SkeletonHeader>
          <SkeletonUsername />
          <SkeletonTimestamp />
        </SkeletonHeader>
        <SkeletonText />
        <SkeletonText />
      </SkeletonMessage>
    ))}
  </>
);

const MessageWrapper = styled.div<{ $isOwn?: boolean; $type?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isOwn ? 'flex-end' : 'flex-start'};
  animation: fadeIn 0.3s ease-in;
  flex-shrink: 0;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div<{ $isOwn?: boolean; $type?: string }>`
  background: ${props => props.$isOwn
    ? 'linear-gradient(135deg, #37433dff 0%, #2f684dff 100%)'
    : 'linear-gradient(135deg, #744210 0%, #d43f3f 100%)'};
  border: 2px solid ${props => props.$isOwn ? '#585f3eff' : '#d43f3f'};
  border-radius: ${props => props.$isOwn ? '15px 15px 0 15px' : '15px 15px 15px 0'};
  padding: 12px 18px;
  max-width: 60%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${props => props.$isOwn ? `
      right: -10px;
      bottom: 0;
      border-width: 0 0 10px 10px;
      border-color: transparent transparent #545337ff transparent;
    ` : `
      left: -10px;
      bottom: 0;
      border-width: 0 10px 10px 0;
      border-color: transparent #5a3410 transparent transparent;
    `}
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const Username = styled.span<{ $type?: string }>`
  font-weight: bold;
  color: #8e8346ff;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const ClanLabel = styled.span`
  font-weight: bold;
  color: #ff6b35;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
`;

const MessageText = styled.p`
  color: #f7fafc;
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  word-wrap: break-word;
`;

const Timestamp = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-top: 4px;
  font-family: 'Arial', sans-serif;
`;



const MainChatMessagesContainer = () => {
  // todo: clanChatId = null? Это дефолтное значение на случай, если data из useSWR будет undefined
   const {messages , mutateMessages} = useMessageChat();
   const { data: selectedRecipientId = null, mutate: mutateSelectedRecipient } = useSWR<string | null>('selectedRecipientId', null, { fallbackData: null });
   const { clanChatId, clanName} = useClanChat();
  const { loading, error } = useLoadAllMessages(mutateMessages);
  const ownerId = useUserId();
  useClanMessages(clanChatId, mutateMessages);
  usePrivateMessages(selectedRecipientId, ownerId, mutateMessages);
  const { deleteMessage } = useMessageActions(mutateMessages);
  const clanIds = useClanIds();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  useScrollToBottom(messagesContainerRef, messages);

   if (error) return <div style={{ color: 'red' }}>{error}</div>;
  return (
    <MessagesContainer ref={messagesContainerRef}>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        messages.map((message) => {
        if (selectedRecipientId) {
          const isPrivateMessage = message.type === MessageTypeEnum.PRIVATE && (message.recipientId === selectedRecipientId || message.userId === selectedRecipientId);
          const isPublic = message.type === MessageTypeEnum.NORMAL;
          if (!isPrivateMessage && !isPublic) return null;
        } else if (clanChatId) {
          const isClanMessage = message.type === MessageTypeEnum.CLAN_CHAT && message.recipientId === clanChatId;
          const isPrivateMessage = message.type === MessageTypeEnum.PRIVATE && (message.recipientId === ownerId || message.userId === ownerId);
          const isPublic = message.type === MessageTypeEnum.NORMAL;
          if (!isClanMessage && !isPrivateMessage && !isPublic) return null;
        } else {
          if (
            message.type === MessageTypeEnum.PRIVATE &&
            message.recipientId !== ownerId &&
            message.userId !== ownerId
          ) {
            return null;
          }
          if (message.type === MessageTypeEnum.CLAN_CHAT && message.recipientId && !clanIds.includes(message.recipientId)) {
            return null;
          }
        }
        const isOwn = message.userId === ownerId;
        const isPrivate = message.type === MessageTypeEnum.PRIVATE;
        const isClan = message.type === MessageTypeEnum.CLAN_CHAT;
  
        if (isPrivate && isOwn && message.text.includes('добавлены в клан')) {
          return null;
        }
        // console.log('MainChatMessagesContainer rendering messages:', messages.length, messages.map(m => m.text));
        return (
          <MessageWrapper key={message.uniqueKey || message.id} $isOwn={isOwn}>
            <MessageBubble $isOwn={isOwn}>
              <MessageHeader>
                {isClan && (message.clanName || clanName) && <ClanLabel>[{message.clanName || clanName}]</ClanLabel>}
                <Username
                  $type={message.userId}
                  style={{
                    cursor: message.userId !== ownerId ? 'pointer' : 'default',
                    textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
                    color: selectedRecipientId === message.userId ? '#ffd700' : undefined
                  }}
                  onClick={() => {
                    if (message.userId !== ownerId) {
                      const newValue = selectedRecipientId === message.userId ? null : message.userId;
                      mutateSelectedRecipient(newValue, false);
                      localStorage.setItem('selectedRecipientId', newValue || '');
                    }
                  }}
                >
                  {message.userId}
                  {isPrivate && (
                    <span style={{ marginLeft: 4, color: '#ffd700', fontSize: 12 }}>
                      (private)
                    </span>
                  )}
                  {isClan && (
                    <span style={{ marginLeft: 4, color: '#00e676', fontSize: 12 }}>
                      (clan)
                    </span>
                  )}
                </Username>
                <Timestamp>
                  {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Timestamp>
                <button onClick={() => deleteMessage(message.id)}>x</button>
              </MessageHeader>
              <MessageText>{message.text}</MessageText>
            </MessageBubble>
          </MessageWrapper>
        );
      })
    )}
    </MessagesContainer>
  );
};

export default MainChatMessagesContainer;