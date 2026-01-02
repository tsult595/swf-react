import { useEffect } from 'react';
import { getAllClanMessagesForUI } from '../clan-chat/getAllClanMessages';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const useClanMessages = (
  clanChatId: string | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  useEffect(() => {
    if (clanChatId) {
      const loadClanMessages = async () => {
        try {
          const msgs = await getAllClanMessagesForUI(
            clanChatId,
            (errorText) => console.error('Clan messages error:', errorText),
            () => {} // loading callback, if needed
          );
          setMessages((prev) => [...prev, ...msgs.filter(m => !prev.some(p => p.id === m.id))]);
        } catch (error) {
          console.error('Failed to load clan messages:', error);
        }
      };
      loadClanMessages();
    }
  }, [clanChatId, setMessages]);
};