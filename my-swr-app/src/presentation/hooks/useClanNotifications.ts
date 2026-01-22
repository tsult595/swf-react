import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useMessageChat } from './useMessageChat';
import { useClanChat } from './useClanChat';

export const useClanNotifications = (
  currentUserId: string,
  mutateClans: () => void,
  mutateClanChatId: (value: string | null, options?: boolean) => void,
  mutateClanName: (value: string | null, options?: boolean) => void
) => {
  const [seenNotifications, setSeenNotifications] = useState<Set<string>>(new Set());
  const { messages } = useMessageChat();
  const { clanChatId } = useClanChat();
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