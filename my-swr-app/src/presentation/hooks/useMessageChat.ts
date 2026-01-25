import useSWR from "swr";
import type { Message } from "../../Domain/Entities/MessageTypes";

export const useMessageChat = () => {
  const { data: messages = [], mutate: mutateMessages } = useSWR<Message[]>(
    'messages',
    null, // без fetcher - только локальный кеш
    { fallbackData: [] }
  );
  
  return { messages, mutateMessages };
};