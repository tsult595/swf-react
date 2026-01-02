import { useCallback } from 'react';
import { MessagePresenter } from '..'; // Или правильный путь
import type { Message } from '../../Domain/Entities/MessageTypes'; // Импорт типа Message

export const useMessageActions = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const deleteMessage = useCallback(async (messageId: string) => {
    // if (messageId.startsWith('temp-')) {
    //   alert('Нельзя удалить неотправленное сообщение');
    //   return;
    // }
    try {
      await MessagePresenter.deleteMessageById(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.log('Failed to delete message', error);
      alert('Failed to delete message');
    }
  }, [setMessages]); // Добавь setMessages в зависимости

  return { deleteMessage };
};