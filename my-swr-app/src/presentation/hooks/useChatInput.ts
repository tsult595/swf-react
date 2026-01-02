import { useState, useCallback } from 'react';

export const useChatInput = (
  sendMessage: (msg: { text: string; recipientId?: string; type: 'private' | 'clanChat' | 'normal'; clanName?: string }) => void,
  selectedRecipientId: string | null,
  clanChatId: string | null,
  clanName: string | null
) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = useCallback(() => {
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
  }, [inputValue, selectedRecipientId, clanChatId, clanName, sendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return { inputValue, setInputValue, handleSendMessage, handleKeyPress };
};