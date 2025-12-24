import styled from 'styled-components';
import { useState, useEffect } from 'react';
import type { UserInfo } from '../../../Domain/Entities/UserType';
import { getAllUsersForUI } from '../../all-users/getAllUsers';
import { createClan } from '../../../data/api/clanApi';
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

const Title = styled.h2`
  color: #ffd700;
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background: #181818;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 12px;
`;

const UserList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  background: #181818;
  border-radius: 8px;
  border: 1px solid #444;
  padding: 8px;
  margin-bottom: 12px;
`;

const UserItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 6px;
  background: ${({ selected }) => (selected ? '#ffd70033' : 'transparent')};
  color: ${({ selected }) => (selected ? '#ffd700' : '#fff')};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd70022;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #ffd700;
  font-size: 1.2rem;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #ffd700;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StyledButton = styled.button`
  background: #ffd700;
  color: #232323;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background 0.2s, color 0.2s;
  &:disabled {
    background: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

interface ChatModalComponentProps {
  onClose: () => void;
  onCreateClan: (clanId: string, clanName: string) => void;
  sendMessage: (args: { text: string; recipientId: string; type: 'private' }) => void;
  prikolniyText?: string;
}

const ChatModalComponent = ({ onClose, onCreateClan, sendMessage, prikolniyText }: ChatModalComponentProps) => {
  const [clanName, setClanName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllUsersForUI(
      (errorText) => setError(errorText),
      (users) => setUsers(users),
      (loading) => setLoading(loading)
    );
  }, []);



  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };



  const handleCreate = async () => {
    if (clanName.trim() && selectedUsers.length > 0) {
      try {
        // Получаем текущий userId из localStorage
        const ownerId = localStorage.getItem('userId');
        if (!ownerId) throw new Error('UserId not found');
        // Гарантируем, что ownerId есть в списке участников
        const allMembers = selectedUsers.includes(ownerId) ? selectedUsers : [ownerId, ...selectedUsers];
        const clan = await createClan(clanName.trim(), allMembers, ownerId);
        // Отправляем сообщения участникам
        allMembers.forEach((memberId) => {
          if (memberId !== ownerId) { // Не отправлять себе
            sendMessage({
              text: `Вы были добавлены в клан ${clanName.trim()}!`,
              recipientId: memberId,
              type: 'private',
            });
          }
        });
        onCreateClan(clan.id || clan._id, clan.name);
        onClose();
      } catch (e) {
        alert('Ошибка при создании клана');
      }
    }
  };

 
  const uniqueUsers = users
    ? users.filter((user, idx, arr) => arr.findIndex(u => u.id === user.id) === idx)
    : [];

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>Создать клан</Title>
        {prikolniyText}
        <Input
          placeholder="Название клана"
          value={clanName}
          onChange={(e) => setClanName(e.target.value)}
        />
        <div style={{ color: '#ffd700', marginBottom: 6 }}>Добавить участников:</div>
        <UserList>
          {loading && <LoadingSpinner>Загрузка пользователей...</LoadingSpinner>}
          {error && <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Ошибка: {error}</div>}
          {!loading && !error && uniqueUsers.map((user) => (
            <UserItem
              key={user.id}
              selected={selectedUsers.includes(user.id)}
              onClick={() => toggleUser(user.id)}
            >
              <span>{user.nickname || user.id}</span>
            </UserItem>
          ))}
        </UserList>
        <StyledButton onClick={handleCreate} disabled={!clanName.trim() || selectedUsers.length === 0}>
          Создать клан
        </StyledButton>
        <StyledButton style={{ background: '#444', color: '#fff', marginTop: 0 }} onClick={onClose}>
          Отмена
        </StyledButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatModalComponent;