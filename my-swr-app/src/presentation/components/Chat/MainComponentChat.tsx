import styled, { css } from 'styled-components';
import { useState} from 'react';
import useSWR from 'swr';
import ChatModalComponent from '../../Modals/ChatModalComponent/ChatModalComponent';
import ChatModifyComponentModul from '../../Modals/ChatModalComponent/ChatModifyComponentModul';
import MainChatMessagesContainer from './MainChatMessagesContainer';
import MainChatInputContainer from './MainChatInputContainer';
import MainChatHeader from './MainChatHeader';
import type { Message } from '../../../Domain/Entities/MessageTypes';
import { ClanPresenter } from '../..';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { useUserId } from '../../hooks/useUserId';
import { useClanNotifications } from '../../hooks/useClanNotifications';


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
  const { mutate: mutateClans } = ClanPresenter.useGetClansByUserId(ownerId || currentUserId);
  const { data: messages = []} = useSWR<Message[]>('messages', null, { fallbackData: [] });
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(localStorage.getItem('selectedRecipientId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
  const [clanName, setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  useLocalStorageSync({ clanChatId, clanName, selectedRecipientId });

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


  return (
    <>
      <ChatContainer>
        <MainChatHeader
          onCreateClanClick={() => setIsModalOpen(true)}
          onModifyClanClick={() => setIsModifyModalOpen(true)}
          
        />
        <MainChatMessagesContainer
          clanChatId={clanChatId}
          selectedRecipientId={selectedRecipientId}
          clanName={clanName}
          onSelectRecipient={setSelectedRecipientId}
         
        />
        <MainChatInputContainer
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
          onClose={() => setIsModifyModalOpen(false)}
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