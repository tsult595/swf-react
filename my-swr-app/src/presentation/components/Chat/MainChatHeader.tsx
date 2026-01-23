import styled from 'styled-components';
import { Scroll } from 'lucide-react';
import HeaderBackGround from '../../../assets/page_header_background.png';
import { useUserId } from '../../hooks/useUserId';


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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(212, 175, 55, 0.4);
    background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;



interface MainChatHeaderProps {
  onCreateClanClick: () => void;
  onModifyClanClick: () => void;
}

const MainChatHeader: React.FC<MainChatHeaderProps> = ({ onCreateClanClick, onModifyClanClick }) => {
   const currentUserId = useUserId();
  return (
    <ChatHeader>
     
      {currentUserId}
      <Scroll size={28} color="#665d3fff" />
      {/* setIsModalOpen(true)} stanovitsa true */}
      <CreateGroupButton onClick={onCreateClanClick}>
        Создать свой клан
      </CreateGroupButton>
      <CreateGroupButton onClick={onModifyClanClick}>
        Мой клан
      </CreateGroupButton>
      <h2>Chat</h2>
    </ChatHeader>
  );
};

export default MainChatHeader;