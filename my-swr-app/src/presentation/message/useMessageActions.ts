import { useCallback } from 'react';
import { MessagePresenter } from '..'; 
import type { Message } from '../../Domain/Entities/MessageTypes'; 

export const useMessageActions = (
  mutateMessages: (updater: (prev: Message[] | undefined) => Message[], revalidate?: boolean) => void
) => {
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      await MessagePresenter.deleteMessageById(messageId);
      mutateMessages(prev => (prev || []).filter(m => m.id !== messageId), false);
    } catch (error) {
      console.log('Failed to delete message', error);
      alert('Failed to delete message');
    }
  }, [mutateMessages]); 

  return { deleteMessage };
};