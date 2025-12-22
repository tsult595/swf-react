const API_URL = 'http://localhost:3001/api';
import type { Message  } from '../../Domain/Entities/MessageTypes';


export type SendMessageImport = Omit<Message, 'id' | 'timestamp'>;

export const sendMessage = async (data: SendMessageImport): Promise<Message> => {
  const response = await fetch(`${API_URL}/send_message`, {
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

export const getAllMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get messages');
  }
  
  return response.json();
};

export const getAllPrivateMessages = async (userId: string): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/private-messages?userId=${userId}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get private messages');
  }
  
  return response.json();
};

export const getAllClanMessages = async (clanId: string): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/clan-messages?clanId=${clanId}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get clan messages');
  }
  
  return response.json();
};