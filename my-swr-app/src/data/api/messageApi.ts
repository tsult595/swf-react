const API_URL = 'http://localhost:3001/api';
import type { Message  } from '../../Domain/Entities/MessageTypes';


export type SendMessageImport = Omit<Message, 'id' | 'timestamp' | 'type'>;

export const sendMessage = async (data: SendMessageImport): Promise<Message> => {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to send message');
  }
  
  return response.json();
};