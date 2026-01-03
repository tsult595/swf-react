import styled from 'styled-components';
import { Send } from 'lucide-react';
import HeaderBackGround from '../../../assets/page_header_background.png';
import { useChatInput } from '../../hooks/useChatInput';

const InputContainer = styled.div`
  flex-shrink: 0;
  background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
  border: 3px solid #2f2e2aff;
  border-radius: 0 0 10px 10px;
  padding: 15px 20px;
  display: flex;
  background-image: url(${HeaderBackGround});
  gap: 10px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  flex: 1;
  background: rgba(26, 20, 16, 0.8);
  border: 2px solid #252524ff;
  border-radius: 8px;
  padding: 12px 18px;
  color: #f7fafc;
  font-size: 15px;
  outline: none;
  transition: all 0.3s;
  
  &::placeholder {
    color: rgba(212, 175, 55, 0.5);
  }
  
  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

const SendButton = styled.button`
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

const PrivateButton = styled.button`
  width: 25px;
  height: 25px;
  margin-left: 16px;
  background: #dfa7a7ff;
  border-radius: 15%;
`;

const SelectedSpan = styled.span`
  color: #ffd700;
  margin-right: 12px;
  margin-top: 10px;
`;

interface MainChatInputContainerProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selectedRecipientId: string | null;
  clanChatId: string | null;
  clanName: string | null;
  onClearSelection: () => void;
}

const MainChatInputContainer: React.FC<MainChatInputContainerProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress,
  selectedRecipientId,
  clanChatId,
  clanName,
  onClearSelection
}) => {
  return (
    <InputContainer>
      {selectedRecipientId ? (
        <SelectedSpan>
          Приватный чат с: {selectedRecipientId}
          <PrivateButton onClick={onClearSelection}>X</PrivateButton>
        </SelectedSpan>
      ) : clanChatId ? (
        <SelectedSpan>
          Клановый чат: {clanName || clanChatId}
          <PrivateButton onClick={onClearSelection}>X</PrivateButton>
        </SelectedSpan>
      ) : null}
      <Input
        type="text"
        placeholder={
          selectedRecipientId
            ? `Приватно для ${selectedRecipientId}`
            : clanChatId
              ? `Клановый чат: ${clanChatId}`
              : 'Введите сообщение...'
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={onKeyPress}
      />
      <SendButton onClick={onSendMessage}>
        <Send size={18} />
        Отправить
      </SendButton>
    </InputContainer>
  );
};

export default MainChatInputContainer;