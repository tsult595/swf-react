import styled, { css } from 'styled-components';
import { useState, useRef, useCallback} from 'react';
import { useChatSocket } from '../../hooks/useChatSocket';
import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
import MainChatMessagesContainer from './MainChatMessagesContainer';
import MainChatInputContainer from './MainChatInputContainer';
import MainChatHeader from './MainChatHeader';
import type { Message } from '../../../Domain/Entities/MessageTypes';
import { ClanPresenter } from '../..';
import { useMessageActions } from '../../message/useMessageActions';
import { useClanMessages } from '../../hooks/useClanMessages';
import { usePrivateMessages } from '../../hooks/usePrivateMessages';
import { useClanAddRemove } from '../../hooks/useClanAddRemove';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { useChatInput } from '../../hooks/useChatInput';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUsername = 'Tima';
  const clanIds = clans ? clans.map((c: ClanDocument) => c.id || c._id).filter(Boolean) as string[] : [];
  const [selectedUsers] = useState<string[]>([]);
  const allMembers = selectedUsers.includes(ownerId) ? selectedUsers : [ownerId, ...selectedUsers];
  const onNewMessage = useCallback((message: Message) => {
    setMessages(prev => {
      if (message.userId === currentUserId && !message.id.startsWith('temp-')) return prev;
      if (message.userId === currentUserId && message.type === 'private' && message.text.includes('удалены из клана')) return prev;

      const newPrev = [...prev];
      if (message.id.startsWith('temp-')) {
        message.uniqueKey = message.id;
        newPrev.push(message);
      } else {
        message.uniqueKey = message.id; 
        const tempIndex = newPrev.findIndex(m => m.text === message.text && m.userId === message.userId && m.type === message.type && m.recipientId === message.recipientId && m.id.startsWith('temp-'));
        if (tempIndex !== -1) {
          const temp = newPrev[tempIndex];
          message.uniqueKey = temp.uniqueKey;
          Object.assign(temp, message); 
        } else {
          newPrev.push(message);
        }
      }
      return newPrev;
    });
  }, [currentUserId]);
  const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage);
  const messagesContainerRef = useRef<HTMLElement | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
  const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  const { deleteMessage } = useMessageActions(setMessages);
  useClanMessages(clanChatId, setMessages);
  usePrivateMessages(selectedRecipientId, currentUserId, setMessages);
  const { handleAddUser, handleRemoveUser } = useClanAddRemove(ownerId, sendMessage, mutateClans);
  useLocalStorageSync({ clanChatId, clanName, selectedRecipientId });
  const { inputValue, setInputValue, handleSendMessage, handleKeyPress } = useChatInput(sendMessage, selectedRecipientId, clanChatId, clanName);
  useScrollToBottom(messagesContainerRef, messages);
  const { loading, error } = useLoadAllMessages(setMessages);
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
          onDeleteMessage={deleteMessage}
          onSelectRecipient={setSelectedRecipientId}
          containerRef={messagesContainerRef}
          loading={loading}
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
            mutateClans(); 
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