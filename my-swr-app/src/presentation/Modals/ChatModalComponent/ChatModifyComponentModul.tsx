import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getClansByUserId, addUserToClan, removeUserFromClan, deleteClan } from '../../../data/api/clanApi';
import type { ClanDocument } from '../../../Domain/Entities/ClanTypes';
import type { UserInfo } from '../../../Domain/Entities/UserType';
import { getAllUsersForUI } from '../../all-users/getAllUsers';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #232323;
  border-radius: 16px;
  padding: 32px 28px 24px 28px;
  min-width: 400px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ClanList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  background: #181818;
  border-radius: 8px;
  border: 1px solid #444;
  padding: 8px;
  margin-bottom: 12px;
`;

const ClanItem = styled.div<{ $owner: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 6px;
  background: ${({ $owner }) => ($owner ? '#00e67633' : '#2196f333')};
  color: ${({ $owner }) => ($owner ? '#00e676' : '#2196f3')};
  font-weight: ${({ $owner }) => ($owner ? 'bold' : 'normal')};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ $owner }) => ($owner ? '#00e67655' : '#2196f355')};
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #b8941e 100%);
  color: #232323;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
  }
`;

const MemberList = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const MemberItem = styled.div<{ isMember: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 4px;
  background: ${({ isMember }) => (isMember ? '#00e67633' : 'transparent')};
  color: ${({ isMember }) => (isMember ? '#00e676' : '#fff')};
  font-weight: ${({ isMember }) => (isMember ? 'bold' : 'normal')};
  cursor: ${({ isMember }) => (isMember ? 'default' : 'pointer')};
`;

const RemoveButton = styled.button`
  background: #d43f3f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 4px 10px;
  margin-left: 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #a81c1c;
  }
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
`;

interface ChatModifyComponentModulProps {
  userId: string;
  onClose: () => void;
  onOpenChat: (data: { clanId: string, clanName: string }) => void;
  sendMessage: (args: { text: string; recipientId: string; type: 'private' }) => void;
  onClanUpdate: (action: 'add' | 'remove', clanId: string) => void;
}


const ChatModifyComponentModul = ({ userId, onClose, onOpenChat, sendMessage, onClanUpdate }: ChatModifyComponentModulProps) => {
  const [clans, setClans] = useState<ClanDocument[]>([]);
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [selectedClan, setSelectedClan] = useState<ClanDocument | null>(null);

    useEffect(() => {
      getClansByUserId(userId).then(setClans);
      getAllUsersForUI(() => {}, setAllUsers, () => {}).then(() => {});
    }, [userId]);


  const handleAddUser = async (_clanId: string, userId: string) => {
    const clanId = selectedClan?.id || selectedClan?._id;
    console.log('handleAddUser', { clanId, userId });
    if (!clanId) return;
    await addUserToClan(clanId, userId);
    sendMessage({
      text: `Вы были добавлены в клан ${selectedClan.name}!`,
      recipientId: userId,
      type: 'private',
    });
    onClanUpdate('add', clanId);
    setSelectedClan(selectedClan && {
      ...selectedClan,
      members: [...selectedClan.members, userId],
    });
  };

  const handleRemoveUser = async (clanId: string, memberId: string) => {
    console.log('handleRemoveUser', { clanId, memberId });
    await removeUserFromClan(clanId, memberId);
    onClanUpdate('remove', clanId);
    // Refetch clans to ensure UI is updated
    const updatedClans = await getClansByUserId(userId);
    setClans(updatedClans);
    // Update selectedClan if it's the modified clan
    const updatedSelectedClan = updatedClans.find((c: ClanDocument) => (c.id || c._id) === clanId);
    setSelectedClan(updatedSelectedClan || selectedClan);
    setSelectedClan(selectedClan && (selectedClan.id || selectedClan._id) === clanId ? {
      ...selectedClan,
      members: selectedClan.members.filter(id => id !== memberId),
    } : selectedClan);
  };


  const renderUsers = (clan: ClanDocument) => (
    <MemberList style={{ border: '2px solid #ffd700', borderRadius: 8, padding: 8 }}>
      {allUsers.map((u) => {
        const isMember = clan.members.includes(u.id);
        const isOwner = clan.ownerId === u.id;
        const isCurrentUser = userId === u.id;
        const isCurrentUserOwner = clan.ownerId === userId;
        return (
          <MemberItem
            key={u.id}
            isMember={isMember}
            // style={{
            //   color: isMember ? '#00e676' : '#fff',
            //   border: isMember ? '2px solid #00e676' : 'none',
            //   background: isMember ? '#003c1a33' : 'transparent',
            //   marginBottom: 6,
            //   cursor: isMember ? 'default' : 'pointer',
            // }}
          >
            {u.nickname || u.id}
            {isMember && isOwner && (
              <span style={{ marginLeft: 8, color: '#ffd700', fontWeight: 'bold' }}>(Владелец)</span>
            )}
            {isMember && !isOwner && isCurrentUser && (
              <RemoveButton style={{ marginLeft: 12 }} onClick={e => { e.stopPropagation(); if (clan.id || clan._id) handleRemoveUser((clan.id || clan._id) as string, u.id); }}>Покинуть</RemoveButton>
            )}
            {isMember && isCurrentUserOwner && !isCurrentUser && (
              <RemoveButton style={{ marginLeft: 12 }} onClick={e => { e.stopPropagation(); if (clan.id || clan._id) handleRemoveUser((clan.id || clan._id) as string, u.id); }}>Удалить</RemoveButton>
            )}
            {!isMember && isCurrentUserOwner && (
              <Button style={{ marginLeft: 12, background: '#00e676', color: '#232323' }} onClick={e => { e.stopPropagation(); if (clan.id || clan._id) handleAddUser((clan.id || clan._id) as string, u.id); }}>Добавить</Button>
            )}
          </MemberItem>
        );
      })}
    </MemberList>
  );

  return (
    <ModalOverlay>
      <ModalContainer>
        <SectionTitle>Мои кланы</SectionTitle>
        <ClanList>
          {clans.map(clan => {
            const isOwner = clan.ownerId === userId;
            const isMember = clan.members.includes(userId);
            return (
              <ClanItem
                key={clan.id || clan._id}
                $owner={isOwner}
              >
                <span style={{ cursor: 'pointer' }} onClick={() => {
                  const clanId = clan.id || clan._id;
                  if (clanId) onOpenChat({ clanId: clanId as string, clanName: clan.name });
                }}>{clan.name}</span>
                <div>
                  {isOwner && <Button style={{ marginLeft: 8 }} onClick={() => setSelectedClan(clan)}>Управление</Button>}
                  {isOwner ? (
                    <Button style={{ marginLeft: 8, background: '#d43f3f', color: '#fff' }} onClick={() => {
                      const clanId = clan.id || clan._id;
                      if (clanId && window.confirm('Удалить клан?')) {
                        deleteClan(clanId as string).then(() => setClans(clans.filter(c => (c.id || c._id) !== clanId)));
                      }
                    }}>Удалить</Button>
                  ) : isMember ? (
                    <Button style={{ marginLeft: 8, background: '#d43f3f', color: '#fff' }} onClick={() => {
                      const clanId = clan.id || clan._id;
                      if (clanId && window.confirm('Покинуть клан?')) {
                        handleRemoveUser(clanId as string, userId);
                        setClans(clans.filter(c => (c.id || c._id) !== clanId));
                        if (selectedClan && (selectedClan.id || selectedClan._id) === clanId) {
                          setSelectedClan(null);
                        }
                      }
                    }}>Покинуть</Button>
                  ) : null}
                </div>
              </ClanItem>
            );
          })}
        </ClanList>

        {selectedClan && (
          <>
            <SectionTitle>Пользователи клана: {selectedClan.name}</SectionTitle>
            {renderUsers(selectedClan)}
            <Button onClick={() => setSelectedClan(null)}>Назад</Button>
            {selectedClan.ownerId === userId && (
              <Button style={{ background: '#d43f3f', color: '#fff', marginLeft: 8 }} onClick={() => {
                const clanId = selectedClan.id || selectedClan._id;
                if (clanId && window.confirm('Удалить клан?')) {
                  deleteClan(clanId as string).then(() => {
                    setClans(clans.filter(c => (c.id || c._id) !== clanId));
                    setSelectedClan(null);
                  });
                }
              }}>Удалить клан</Button>
            )}
          </>
        )}

        <Button style={{ background: '#444', color: '#fff', marginTop: 0 }} onClick={onClose}>
          Закрыть
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatModifyComponentModul;