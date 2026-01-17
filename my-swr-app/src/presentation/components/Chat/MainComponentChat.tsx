import styled, { css } from 'styled-components';
import { useState, useRef, useCallback} from 'react';
import useSWR from 'swr';
import { useChatSocket } from '../../hooks/useChatSocket';
import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
import MainChatMessagesContainer from './MainChatMessagesContainer';
import MainChatInputContainer from './MainChatInputContainer';
import MainChatHeader from './MainChatHeader';
import type { Message } from '../../../Domain/Entities/MessageTypes';
import { ClanPresenter } from '../..';
import { useClanMessages } from '../../hooks/useClanMessages';
import { usePrivateMessages } from '../../hooks/usePrivateMessages';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { useUserId } from '../../hooks/useUserId';
import { useClanNotifications } from '../../hooks/useClanNotifications';
import { useLoadAllMessages } from '../../hooks/useLoadAllMessages';

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
  const currentUserId = useUserId();
  const ownerId = localStorage.getItem('userId') || '';
  const { data: clans, mutate: mutateClans } = ClanPresenter.useGetClansByUserId(ownerId || currentUserId);
  const { data: messages = [], mutate: mutateMessages } = useSWR<Message[]>('messages', null, { fallbackData: [] });
  const currentUsername = 'Tima';
  const clanIds = clans ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
  const [selectedUsers] = useState<string[]>([]);
  const allMembers = selectedUsers.includes(ownerId) ? selectedUsers : [ownerId, ...selectedUsers];
  const onNewMessage = useCallback((message: Message) => {
    mutateMessages(prev => {
      const currentPrev = prev || [];
      if (message.userId === currentUserId && message.type === 'private' && message.text.includes('удалены из клана')) return currentPrev;

      return [...currentPrev, message];
    }, false);
  }, [currentUserId, mutateMessages]);
  const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage);
  const messagesContainerRef = useRef<HTMLElement | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
  const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  useClanMessages(clanChatId, mutateMessages);
  usePrivateMessages(selectedRecipientId, currentUserId, mutateMessages);
  useLocalStorageSync({ clanChatId, clanName, selectedRecipientId });
  useScrollToBottom(messagesContainerRef, messages);
  const { loading, error } = useLoadAllMessages(mutateMessages);
  useClanNotifications(
    messages,
    currentUserId,
    seenNotifications,
    setSeenNotifications,
    mutateClans,
    setClanChatId,
    setClanName,
    clanChatId
  );


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
          mutateMessages={mutateMessages}
          onSelectRecipient={setSelectedRecipientId}
          containerRef={messagesContainerRef}
          loading={loading}
        />
        <MainChatInputContainer
          sendMessage={sendMessage}
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
            mutateClans(); 
          }}
          
        />
      )}
      {isModifyModalOpen && (
        <ChatModifyComponentModul
          userId={currentUserId}
          ownerId={ownerId}
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