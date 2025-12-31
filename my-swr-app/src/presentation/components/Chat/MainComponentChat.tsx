import styled, { css } from 'styled-components';
import { useState, useEffect, useRef, useCallback } from 'react';
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
import { ClanPresenter } from '../..';


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
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const ownerId = localStorage.getItem('userId') || '';
  const { data: clans, mutate: mutateClans } = ClanPresenter.useGetClansByUserId(ownerId || currentUserId);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUsername = 'Tima';
  const clanIds = clans ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
const allMembers = selectedUsers.includes(ownerId) ? selectedUsers : [ownerId, ...selectedUsers];
  const onNewMessage = useCallback((message: Message) => {
    setMessages(prev => {
      // Skip real messages from self to avoid duplicates
      if (message.userId === currentUserId && !message.id.startsWith('temp-')) return prev;

      const newPrev = [...prev];
      if (message.id.startsWith('temp-')) {
        message.uniqueKey = message.id;
        newPrev.push(message);
      } else {
        message.uniqueKey = message.id; // default for new messages
        const tempIndex = newPrev.findIndex(m => m.text === message.text && m.userId === message.userId && m.type === message.type && m.recipientId === message.recipientId && m.id.startsWith('temp-'));
        if (tempIndex !== -1) {
          const temp = newPrev[tempIndex];
          message.uniqueKey = temp.uniqueKey; // keep the same uniqueKey
          Object.assign(temp, message); // update the existing object
        } else {
          newPrev.push(message);
        }
      }
      return newPrev;
    });
  }, [currentUserId]);

  const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage);
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
  const loadMessages = async () => {
    await getAllPublicMessagesForUI(
      (loading) => setLoading(loading),         
      (errorText) => setError(errorText),        
      (messages) => setMessages(messages)        
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
            () => {} 
          );
          const filtered = messages.filter(m =>
             m.recipientId === selectedRecipientId ||
             m.userId === selectedRecipientId);
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
        mutateClans();
      }
      if (
        msg.type === 'private' &&
        msg.recipientId === currentUserId &&
        msg.text.includes('удалены из клана') &&
        !seenNotifications.has(String(msg.id))
      ) {
        // Swal.fire('Вы были удалены из клана!');
        setSeenNotifications((prev) => new Set(prev).add(String(msg.id)));
        if (clanChatId) {
          setClanChatId(null);
          setClanName(null);
        }
        mutateClans();
      }
    });
  }, [messages, currentUserId, seenNotifications]);


  const handleAddUser = async (clanId: string, userId: string, clanName: string) => {
    ClanPresenter.addUserToClan(clanId, userId);
    sendMessage({
      text: `Вы были добавлены в клан ${clanName}!`,
      recipientId: userId,
      type: 'private',
    });
    mutateClans();
  };

  const handleRemoveUser = async (clanId: string, memberId: string) => {
    ClanPresenter.removeUserFromClan(clanId, memberId);
    if (memberId !== currentUserId) {
      sendMessage({
        text: `Вы были удалены из клана!`,
        recipientId: memberId,
        type: 'private',
      });
    }
    mutateClans();
  };


   if (loading) return <div>Загрузка сообщений.</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <ChatContainer>
        <MainChatHeader
          onCreateClanClick={() => setIsModalOpen(true)}
          onModifyClanClick={() => setIsModifyModalOpen(true)}
          currentUserId={currentUserId}
          clanName={clanName || undefined}
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
          ownerId={ownerId}
          allMembers={allMembers}
          onClose={() => setIsModalOpen(false)}
          sendMessage={sendMessage}
          onCreateClan={async (clanId: string, clanName: string) => {
            setClanChatId(clanId);
            setClanName(clanName);
            setSelectedRecipientId(null);
            setIsModalOpen(false);
            mutateClans(); // Refresh clans after creation
          }}
          prikolniyText="welcome"
        />
      )}
      {isModifyModalOpen && (
        <ChatModifyComponentModul
          userId={currentUserId}
          handleAddUser={handleAddUser}
          handleRemoveUser={handleRemoveUser}
          onClose={() => setIsModifyModalOpen(false)}
          sendMessage={sendMessage}
          onOpenChat={async ({ clanId, clanName }) => {
            setClanChatId(clanId);
            setClanName(clanName);
            setIsModifyModalOpen(false);
            setSelectedRecipientId(null);
            mutateClans();
          }}
        />
      )}
    </>
  );
};

export default MainComponentChat;