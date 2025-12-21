import styled from 'styled-components';
import { useState } from 'react';
import useSWR from 'swr';
import type { UserInfo } from '../../../Domain/Entities/UserType';
import { getAllUsers } from '../../../data/api/userApi';
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

const Button = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #b8941e 100%);
  color: #232323;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
  }
`;

interface ChatModalComponentProps {
  onClose: () => void;
  onCreateClan: (clanName: string, userIds: string[]) => void;
}

const fetcher = () => getAllUsers();

const ChatModalComponent = ({ onClose, onCreateClan }: ChatModalComponentProps) => {
  const [clanName, setClanName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: users, isLoading, error } = useSWR<UserInfo[]>('all-users', fetcher);

  // clanId должен быть передан через пропсы или получен из состояния, если редактируется существующий клан
  // Для примера возьмём clanName как clanId, если нет отдельного id

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
        await createClan(clanName.trim(), allMembers, ownerId);
        onCreateClan(clanName.trim(), allMembers);
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
        <Input
          placeholder="Название клана"
          value={clanName}
          onChange={(e) => setClanName(e.target.value)}
        />
        <div style={{ color: '#ffd700', marginBottom: 6 }}>Добавить участников:</div>
        <UserList>
          {isLoading && <div style={{ color: '#fff' }}>Загрузка пользователей...</div>}
          {error && <div style={{ color: 'red' }}>Ошибка загрузки пользователей</div>}
          {uniqueUsers.map((user) => (
            <UserItem
              key={user.id}
              selected={selectedUsers.includes(user.id)}
              onClick={() => toggleUser(user.id)}
            >
              <span>{user.nickname || user.id}</span>
            </UserItem>
          ))}
        </UserList>
        <Button onClick={handleCreate} disabled={!clanName.trim() || selectedUsers.length === 0}>
          Создать клан
        </Button>
        <Button style={{ background: '#444', color: '#fff', marginTop: 0 }} onClick={onClose}>
          Отмена
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ChatModalComponent;