
import type { Message } from '../../Domain/Entities/MessageTypes';

const API_URL = 'http://localhost:3001/api';

export const getAllClanMessages = async (clanId: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/messages/clan-messages?clanId=${clanId}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Failed to get clan messages');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error getting clan messages:', error);
    throw error;
  }
};