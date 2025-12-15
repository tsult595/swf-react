import useSWR from 'swr';
import { sendMessage } from '../../data/api/messageApi';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const useMessage = (
  activeTab: 'global' | 'guild' | 'battle',
  inputValue: string,
  setInputValue: (v: string) => void,
  currentUserId: string,
  currentUsername: string
) => {
  const { data: messages = [], mutate: mutateMessages } = useSWR<Message[]>(
    `/messages/${activeTab}`,
    (url) => fetch(`http://localhost:3001/api${url}`).then(r => r.json()),
    {
      refreshInterval: 3000,
      revalidateOnFocus: true,
    }
  );

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    try {
      const savedMessage = await sendMessage({
        channel: activeTab,
        username: currentUsername,
        userId: currentUserId,
        text: inputValue.trim(),
      });

      mutateMessages([...messages, savedMessage], false);
      mutateMessages();
      setInputValue('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Не удалось отправить сообщение');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    messages,
    mutateMessages,
    handleSendMessage,
    handleKeyPress,
  };
};