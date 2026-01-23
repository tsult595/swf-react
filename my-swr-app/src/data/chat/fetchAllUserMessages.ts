import type { Message } from '../../Domain/Entities/MessageTypes';

const API_URL = 'http://localhost:3001/api';

/**
 * Загружает последние N сообщений для пользователя (все типы: public, clan, private)
 */
export const fetchAllUserMessages = async (userId: string, limit = 100): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/messages/user/${userId}?limit=${limit}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to fetch user messages');
    }
    
    const messages: Message[] = await response.json();
    console.log(`Fetched ${messages.length} messages for user ${userId}`);
    return messages;
  } catch (error) {
    console.error('Error fetching user messages:', error);
    return []; // Возвращаем пустой массив при ошибке, чтобы не ломать UI
  }
};
