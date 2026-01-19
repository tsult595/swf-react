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
  const { mutate: mutateSelectedRecipient } = useSWR<string | null>('selectedRecipientId', null);
  const [clanChatId, setClanChatId] = useState<string | null>(localStorage.getItem('clanChatId'));
  const [_ , setClanName] = useState<string | null>(localStorage.getItem('clanName'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());

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
        <MainChatMessagesContainer />

        <MainChatInputContainer />

      </ChatContainer>
      {isModalOpen && (
        <ChatModalComponent
          onClose={() => setIsModalOpen(false)}
          onCreateClan={async (clanId: string, clanName: string) => {
            setClanChatId(clanId);
            setClanName(clanName);
            mutateSelectedRecipient(null, false);
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
            mutateSelectedRecipient(null, false);
            setIsModifyModalOpen(false);
            mutateClans();
          }}
        />
      )}
    </>
  );
};

export default MainComponentChat;