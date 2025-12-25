import styled, { css } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { getClansByUserId } from '../../../data/api/clanApi';
import { deleteMessageById } from '../../../data/api/messageApi';
import { getAllClanMessagesForUI } from '../../clan-chat/getAllClanMessages';
import { getAllPrivateMessagesForUI } from '../../private-message/getAllPrivateMessages';
import { getAllPublicMessagesForUI } from '../../../presentation/public-chat/getAllPublicMessages';
import { generatePersonalizedUserId } from '../../../utils/userId';
import { useChatSocket } from '../../hooks/useChatSocket';
import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
import Swal from 'sweetalert2';
import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
import MainChatMessagesContainer from './MainChatMessagesContainer';
import MainChatInputContainer from './MainChatInputContainer';
import MainChatHeader from './MainChatHeader';
import type { Message } from '../../../Domain/Entities/MessageTypes';

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

const MainComponentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const currentUsername = 'Tima';
  const [clanIds, setClanIds] = useState<string[]>([]);
  const { sendMessage } = useChatSocket(currentUserId, currentUsername, undefined, undefined, clanIds);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
  const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
  console.log('MainComponentChat messages updated:', messages.length, messages.map(m => m.text));
}, [messages]);

  useEffect(() => {
  const loadMessages = async () => {
    await getAllPublicMessagesForUI(
      (loading) => setLoading(loading),           // loading управляется автоматически
      (errorText) => setError(errorText),         // ошибка показывается
      (messages) => setMessages(messages)         // сообщения приходят
    );
  };

  loadMessages();
}, []);

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
        clanName: clanName || undefined,
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

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessageById(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.log('Failed to delete message', error);
      alert('Failed to delete message');
    }
  };

  useEffect(() => {
    if (clanChatId) {
      const loadClanMessages = async () => {
        try {
          const msgs = await getAllClanMessagesForUI(
            clanChatId,
            (errorText) => console.error('Clan messages error:', errorText),
            () => {} // loading callback, if needed
          );
          setMessages((prev) => [...prev, ...msgs.filter(m => !prev.some(p => p.id === m.id))]);
        } catch (error) {
          console.error('Failed to load clan messages:', error);
        }
      };
      loadClanMessages();
    }
  }, [clanChatId]);

  useEffect(() => {
    if (selectedRecipientId) {
      const loadPrivateMessages = async () => {
        try {
          const messages = await getAllPrivateMessagesForUI(
            currentUserId,
            (errorText) => console.error('Private messages error:', errorText),
            () => {} // loading callback, if needed
          );
          const filtered = messages.filter(m => m.recipientId === selectedRecipientId || m.userId === selectedRecipientId);
          setMessages((prev) => [...prev, ...filtered.filter(m => !prev.some(p => p.id === m.id))]);
        } catch (error) {
          console.error('Failed to load private messages:', error);
        }
      };
      loadPrivateMessages();
    }
  }, [selectedRecipientId, currentUserId]);

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
    async function getUserIdAndClans() {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = await generatePersonalizedUserId();
        localStorage.setItem('userId', userId);
      }
      setCurrentUserId(userId);
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

  // useEffect(() => {
  //   const container = messagesContainerRef.current;
  //   if (container) {
  //     container.scrollTop = container.scrollHeight;
  //   }
  // }, [messages]);

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
        getClansByUserId(currentUserId).then((clans) => {
          const ids = Array.isArray(clans) ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
          setClanIds(ids);
        }).catch((e) => console.error('Failed to refetch clans on add', e));
      }
    });
  }, [messages, currentUserId, seenNotifications]);

   if (loading) return <div>Загрузка сообщений...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <ChatContainer>
        <MainChatHeader
          onCreateClanClick={() => setIsModalOpen(true)}
          onModifyClanClick={() => setIsModifyModalOpen(true)}
          currentUserId={currentUserId}
          someFancyText={"Welcome!"}
        />
        <MainChatMessagesContainer
          messages={messages}
          currentUserId={currentUserId}
          clanIds={clanIds}
          clanChatId={clanChatId}
          selectedRecipientId={selectedRecipientId}
          clanName={clanName}
          onDeleteMessage={handleDeleteMessage}
          onSelectRecipient={setSelectedRecipientId}
          containerRef={messagesContainerRef}
        />
        <MainChatInputContainer
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          selectedRecipientId={selectedRecipientId}
          clanChatId={clanChatId}
          clanName={clanName}
          onClearSelection={() => {
            setSelectedRecipientId(null);
            setClanChatId(null);
            setClanName(null);
          }}
        />
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
          prikolniyText="welcome"
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
  );
};

export default MainComponentChat;