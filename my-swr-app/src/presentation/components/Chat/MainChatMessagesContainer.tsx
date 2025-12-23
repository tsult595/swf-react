import styled from 'styled-components';
import AsideBackGround from '../../../assets/auction_menu_background.png';
import type { Message } from '../../../Domain/Entities/MessageTypes';

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

interface MainChatMessagesContainerProps {
  messages: Message[];
  currentUserId: string;
  clanIds: string[];
  clanChatId: string | null;
  selectedRecipientId: string | null;
  clanName: string | null;
  onDeleteMessage: (messageId: string) => void;
  onSelectRecipient: (recipientId: string | null) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const MainChatMessagesContainer: React.FC<MainChatMessagesContainerProps> = ({
  messages,
  currentUserId,
  clanIds,
  clanChatId,
  selectedRecipientId,
  clanName,
  onDeleteMessage,
  onSelectRecipient,
  containerRef
}) => {
  return (
    <MessagesContainer ref={containerRef}>
      {messages.map((message) => {
        console.log('Rendering message:', message);
        if (clanChatId) {
          const isClanMessage = message.type === 'clanChat' && message.recipientId === clanChatId;
          const isPrivateMessage = message.type === 'private' && (message.recipientId === currentUserId || message.userId === currentUserId);
          if (!isClanMessage && !isPrivateMessage) return null;
        } else {
          if (
            message.type === 'private' &&
            message.recipientId !== currentUserId &&
            message.userId !== currentUserId
          ) {
            return null;
          }
          if (message.type === 'clanChat' && message.recipientId && !clanIds.includes(message.recipientId)) {
            return null;
          }
        }
        const isOwn = message.userId === currentUserId;
        const isPrivate = message.type === 'private';
        const isClan = message.type === 'clanChat';
        return (
          <MessageWrapper key={message.id} $isOwn={isOwn}>
            <MessageBubble $isOwn={isOwn}>
              <MessageHeader>
                {isClan && clanName && <ClanLabel>[{clanName}]</ClanLabel>}
                <Username
                  $type={message.userId}
                  style={{
                    cursor: message.userId !== currentUserId ? 'pointer' : 'default',
                    textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
                    color: selectedRecipientId === message.userId ? '#ffd700' : undefined
                  }}
                  onClick={() => {
                    if (message.userId !== currentUserId) {
                      onSelectRecipient(
                        selectedRecipientId === message.userId ? null : message.userId
                      );
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
                <button onClick={() => onDeleteMessage(message.id)}>x</button>
              </MessageHeader>
              <MessageText>{message.text}</MessageText>
            </MessageBubble>
          </MessageWrapper>
        );
      })}
    </MessagesContainer>
  );
};

export default MainChatMessagesContainer;