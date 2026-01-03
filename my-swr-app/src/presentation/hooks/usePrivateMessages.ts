import { useEffect } from 'react';
import { getAllPrivateMessagesForUI } from '../private-message/getAllPrivateMessages';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const usePrivateMessages = (
  selectedRecipientId: string | null,
  currentUserId: string,
  mutateMessages: (updater: (prev: Message[] | undefined) => Message[], revalidate?: boolean) => void
) => {
  useEffect(() => {
    if (selectedRecipientId) {
      const loadPrivateMessages = async () => {
        try {
          const messages = await getAllPrivateMessagesForUI(
            currentUserId,
            (errorText) => console.error('Private messages error:', errorText),
            () => {}
          );
          const filtered = messages.filter(m =>
            m.recipientId === selectedRecipientId ||
            m.userId === selectedRecipientId
          );
          mutateMessages((prev) => [...(prev || []), ...filtered.filter(m => !(prev || []).some(p => p.id === m.id))], false);
        } catch (error) {
          console.error('Failed to load private messages:', error);
        }
      };
      loadPrivateMessages();
    }
  }, [selectedRecipientId, currentUserId, mutateMessages]);
};