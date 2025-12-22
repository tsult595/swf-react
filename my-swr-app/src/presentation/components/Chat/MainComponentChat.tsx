import styled, { css } from 'styled-components';
import { useState, useEffect , useRef } from 'react';
import { getClansByUserId } from '../../../data/api/clanApi';
import { getAllClanMessages, getAllPrivateMessages } from '../../../data/api/messageApi';
import { Send, Scroll } from 'lucide-react';
import AsideBackGround from '../../../assets/auction_menu_background.png';
import HeaderBackGround from '../../../assets/page_header_background.png';
// import { io, Socket } from 'socket.io-client';
import { generatePersonalizedUserId } from '../../../utils/userId';
// import type { Message } from '../../../Domain/Entities/MessageTypes';
import { useChatSocket } from '../../hooks/useChatSocket';
import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
import Swal from 'sweetalert2';import useSWR from 'swr';
import { getAllClans } from '../../../data/api/clanApi';
import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';




const FrameBorderModalMain = css`
  border-style: solid;
  border-image-width: 40px;
  border-image-source: url('/assets/frame_16_background.png');
  border-image-slice: 40 fill;
  border-image-repeat: round;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  font-family: 'Cinzel', serif;
 
  ${FrameBorderModalMain}
  padding: 20px;
 
`;

const ChatHeader = styled.div`
  background-image: url(${HeaderBackGround});
  border: 3px solid #57503aff;
  border-radius: 10px 10px 0 0;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  
  h2 {
    color: #d4af37;
    margin: 0;
    font-size: 24px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 2px;
  }
`;

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
      transform: translateY(10px);
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
    : 'linear-gradient(135deg, #744210 0%, #d43f3f 100%)'}; // <-- изменённый цвет для чужих сообщений
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

const InputContainer = styled.div`
  flex-shrink: 0;
  background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
  border: 3px solid #2f2e2aff;
  border-radius: 0 0 10px 10px;
  padding: 15px 20px;
  display: flex;
  background-image: url(${HeaderBackGround});
  gap: 10px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  flex: 1;
  background: rgba(26, 20, 16, 0.8);
  border: 2px solid #252524ff;
  border-radius: 8px;
  padding: 12px 18px;
  color: #f7fafc;
  font-size: 15px;
  outline: none;
  transition: all 0.3s;
  
  &::placeholder {
    color: rgba(212, 175, 55, 0.5);
  }
  
  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #d4af37 0%, #b8941e 100%);
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 12px 24px;
  color: #2d1810;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(212, 175, 55, 0.4);
    background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrivateButton = styled.button`
  width: 25px;
  height: 25px;
  margin-left: 16px;
  background: #dfa7a7ff;
  border-radius: 15%;
`;

const CreateGroupButton = styled.button`
  background: linear-gradient(135deg, #d4af37 0%, #b8941e 100%);
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 12px 24px;
  color: #2d1810;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const SelectedSpan = styled.span`
  color: #ffd700;
  margin-right: 12px;
  margin-top: 10px;
  
`;


const MainComponentChat = () => {
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const currentUsername = 'Tima';
  const [clanIds, setClanIds] = useState<string[]>([]);
  const { messages, sendMessage, setMessages } = useChatSocket(currentUserId, currentUsername);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId')); // id или имя клана
  const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const { data: allClans } = useSWR('http://localhost:3001/api/clans', getAllClans);
  const clanMap = allClans && Array.isArray(allClans) ? allClans.reduce((acc: Record<string, string>, clan: ClanDocument) => {
    acc[clan._id || clan.id] = clan.name;
    return acc;
  }, {}) : {};
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  
  useEffect(() => {
  if (clanChatId) {
    getAllClanMessages(clanChatId).then((msgs) => {
    
      setMessages((prev) => [...prev, ...msgs.filter(m => !prev.some(p => p.id === m.id))]);
    });
  }
}, [clanChatId]);

useEffect(() => {
  if (selectedRecipientId) {
    getAllPrivateMessages(currentUserId).then((msgs) => {

      const filtered = msgs.filter(m => m.recipientId === selectedRecipientId || m.userId === selectedRecipientId);
      setMessages((prev) => [...prev, ...filtered.filter(m => !prev.some(p => p.id === m.id))]);
    });
  }
}, [selectedRecipientId]);

  useEffect(() => {
    if (clanChatId) localStorage.setItem('clanChatId', clanChatId);
    else localStorage.removeItem('clanChatId');
  }, [clanChatId]);

  useEffect(() => {
    if (clanName) localStorage.setItem('clanName', clanName);
    else localStorage.removeItem('clanName');
  }, [clanName]);

  useEffect(() => {
    if (selectedRecipientId) localStorage.setItem('selectedRecipientId', selectedRecipientId);
    else localStorage.removeItem('selectedRecipientId');
  }, [selectedRecipientId]);

  useEffect(() => {
    setMessages(prev => prev.filter(msg => {
      if (msg.type === 'clanChat' && msg.recipientId && !clanIds.includes(msg.recipientId)) return false;
      return true;
    }));
  }, [clanIds]);

const handleSendMessage = () => {
  if (!inputValue.trim()) return;
  if (selectedRecipientId) {
    sendMessage({
      text: inputValue,
      recipientId: selectedRecipientId,
      type: 'private',
    });
  } else if (clanChatId) {
    sendMessage({
      text: inputValue,
      recipientId: clanChatId,
      type: 'clanChat',
    });
  } else {
    sendMessage({
      text: inputValue,
      type: 'normal',
    });
  }
  setInputValue('');
};

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
};

  useEffect(() => {
    async function getUserIdAndClans() {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = await generatePersonalizedUserId();
        localStorage.setItem('userId', userId);
      }
      setCurrentUserId(userId);
      // Получаем кланы пользователя и сохраняем их id
      try {
        const clans = await getClansByUserId(userId);
        const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
        setClanIds(ids);
      } catch (e) {
        console.error('Failed to fetch clans', e);
        setClanIds([]);
      }
    }
    getUserIdAndClans();
  }, []);
 
  useEffect(() => {
  const container = messagesContainerRef.current;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}, [messages]);

  useEffect(() => {
    messages.forEach((msg) => {
      if (
        msg.type === 'private' &&
        msg.recipientId === currentUserId &&
        msg.text.includes('added to clan') &&
        !seenNotifications.has(String(msg.id))
      ) {
        Swal.fire('Вы были добавлены в клан!');
        setSeenNotifications((prev) => new Set(prev).add(String(msg.id)));
        // Refetch clans to update clanIds
        getClansByUserId(currentUserId).then((clans) => {
          const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
          setClanIds(ids);
        }).catch((e) => console.error('Failed to refetch clans on add', e));
      }
    });
  }, [messages, currentUserId, seenNotifications]);


  return (
    <>
      <ChatContainer>
        <ChatHeader>
          {currentUserId}
          <Scroll size={28} color="#665d3fff" />
          <CreateGroupButton onClick={() => setIsModalOpen(true)}>
            Создать свой клан
          </CreateGroupButton>
          <CreateGroupButton onClick={() => setIsModifyModalOpen(true)}>
            Мой клан  
          </CreateGroupButton>
          <h2>Chat</h2>
        </ChatHeader>

        <MessagesContainer ref={messagesContainerRef}>
          {messages.map((message) => {
          
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
                    {isClan && (clanName || (message.recipientId && clanMap[message.recipientId])) && <ClanLabel>[{clanName || clanMap[message.recipientId as string]}]</ClanLabel>}
                    <Username
                      $type={message.userId}
                      style={{
                        cursor: message.userId !== currentUserId ? 'pointer' : 'default',
                        textDecoration: selectedRecipientId === message.userId ? 'underline' : 'none',
                        color: selectedRecipientId === message.userId ? '#ffd700' : undefined
                      }}
                      onClick={() => {
                        if (message.userId !== currentUserId) {
                          setSelectedRecipientId(
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
                  </MessageHeader>
                  <MessageText>{message.text}</MessageText>
                </MessageBubble>
              </MessageWrapper>
            );
          })}
        </MessagesContainer>

        <InputContainer>
          {selectedRecipientId ? (
            <SelectedSpan>
              Приватный чат с: {selectedRecipientId}
              <PrivateButton onClick={() => setSelectedRecipientId(null)}>X</PrivateButton>
            </SelectedSpan>
          ) : clanChatId ? (
            <SelectedSpan>
              Клановый чат: {clanName || clanChatId}
              <PrivateButton onClick={() => { setClanChatId(null); setClanName(null); }}>X</PrivateButton>
            </SelectedSpan>
          ) : null}
          <Input
            type="text"
            placeholder={
              selectedRecipientId
                ? `Приватно для ${selectedRecipientId}`
                : clanChatId
                  ? `Клановый чат: ${clanChatId}`
                  : 'Введите сообщение...'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <SendButton onClick={handleSendMessage}>
            <Send size={18} />
            Отправить
          </SendButton>
        </InputContainer>
      </ChatContainer>
      {isModalOpen && (
        <ChatModalComponent
          onClose={() => setIsModalOpen(false)}
          sendMessage={sendMessage}
          onCreateClan={async (clanId: string, clanName: string) => {
            setClanChatId(clanId);
            setClanName(clanName);
            setSelectedRecipientId(null);
            setIsModalOpen(false);
          }}
        />
      )}
      {isModifyModalOpen && (
        <ChatModifyComponentModul
          userId={currentUserId}
          onClose={() => setIsModifyModalOpen(false)}
          sendMessage={sendMessage}
          onClanUpdate={(action?: 'add' | 'remove', clanId?: string) => {
            if (action === 'remove' && clanId) {
              setClanIds(prev => prev.filter(id => id !== clanId));
            } else if (action === 'add' && clanId) {
              setClanIds(prev => prev.includes(clanId) ? prev : [...prev, clanId]);
            }
            getClansByUserId(currentUserId).then((clans) => {
              const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
              setClanIds(ids);
            }).catch((e) => console.error('Failed to refetch clans on update', e));
          }}
          onOpenChat={async ({ clanId, clanName }) => {
            setClanChatId(clanId);
            setClanName(clanName);
            setIsModifyModalOpen(false);
            setSelectedRecipientId(null);
          
            try {
              const clans = await getClansByUserId(currentUserId);
              const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
              setClanIds(ids);
            } catch (e) {
              console.error('Failed to refetch clans', e);
            }
          }}
        />
      )}
    </>
  )
};

export default MainComponentChat;