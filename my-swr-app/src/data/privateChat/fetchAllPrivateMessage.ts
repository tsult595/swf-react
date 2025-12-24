import type { Message } from '../../Domain/Entities/MessageTypes';

const API_URL = 'http://localhost:3001/api';


export const getAllPrivateMessages = async (userId: string): Promise<Message[]> => {
  const response = await fetch(`${API_URL}/messages/private-messages?userId=${userId}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get private messages');
  }
  
  return response.json();
};