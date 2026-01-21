import { useEffect } from 'react';
import Swal from 'sweetalert2';
import type { Message } from '../../Domain/Entities/MessageTypes';

export const useClanNotifications = (
  messages: Message[],
  currentUserId: string,
  seenNotifications: Set<string>,
  setSeenNotifications: React.Dispatch<React.SetStateAction<Set<string>>>,
  mutateClans: () => void,
  mutateClanChatId: (value: string | null, options?: boolean) => void,
  mutateClanName: (value: string | null, options?: boolean) => void,
  clanChatId: string | null
) => {
  useEffect(() => {
    messages.forEach((msg) => {
      if (
        msg.type === 'private' &&
        msg.recipientId === currentUserId &&
        msg.text.includes('added to clan') &&
        !seenNotifications.has(String(msg.id))
      ) {
        Swal.fire('Вы были добавлены в клан!');
        setSeenNotifications((prev) => new Set(prev).add(String(msg.id)));
        mutateClans();
      }
      if (
        msg.type === 'private' &&
        msg.recipientId === currentUserId &&
        msg.text.includes('удалены из клана') &&
        !seenNotifications.has(String(msg.id))
      ) {
        // Swal.fire('Вы были удалены из клана!');
        setSeenNotifications((prev) => new Set(prev).add(String(msg.id)));
        if (clanChatId) {
          mutateClanChatId(null, false);
          mutateClanName(null, false);
        }
        mutateClans();
      }
    });
  }, [messages, currentUserId, seenNotifications, mutateClans, mutateClanChatId, mutateClanName, clanChatId, setSeenNotifications]);
};