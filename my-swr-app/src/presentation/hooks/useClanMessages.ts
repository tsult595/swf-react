import { useEffect } from 'react';
import { getAllClanMessagesForUI } from '../clan-chat/getAllClanMessages';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const useClanMessages = (
  clanChatId: string | null,
  mutateMessages: (updater: (prev: Message[] | undefined) => Message[], revalidate?: boolean) => void
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
          mutateMessages((prev) => [...(prev || []), ...msgs.filter(m => !(prev || []).some(p => p.id === m.id))], false);
        } catch (error) {
          console.error('Failed to load clan messages:', error);
        }
      };
      loadClanMessages();
    }
  }, [clanChatId, mutateMessages]);
};