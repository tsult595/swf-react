import useSWR from "swr";
import type { Message } from "../../Domain/Entities/MessageTypes";
import { fetchAllUserMessages } from "../../data/chat/fetchAllUserMessages";
import { useUserId } from "./useUserId";

export const useMessageChat = () => {
  const userId = useUserId();
  
  const { data: messages = [], mutate: mutateMessages } = useSWR<Message[]>(
    userId ? ['messages', userId] : null, // ключ зависит от userId
    () => fetchAllUserMessages(userId, 100), // загружаем последние 100 сообщений
    { 
      fallbackData: [],
      revalidateOnFocus: false, // не перезагружать при фокусе
      revalidateOnReconnect: true // перезагрузить при восстановлении соединения
    }
  );
  
  return { messages, mutateMessages };
};