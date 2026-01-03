import { useEffect, useState } from 'react';
import { getAllPublicMessagesForUI } from '../../presentation/public-chat/getAllPublicMessages';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const useLoadAllMessages = (mutateMessages: (updater: (prev: Message[] | undefined) => Message[], revalidate?: boolean) => void) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {
    const loadMessages = async () => {
      await getAllPublicMessagesForUI(
        (loading) => setLoading(loading),         
        (errorText) => setError(errorText),        
        (messages) => mutateMessages(() => messages, false)        
      );
    };
    loadMessages();
  }, [mutateMessages]);

  return { loading, error }; // Возвращаем, чтобы компонент мог использовать
};