const API_URL = 'http://localhost:3001/api';
import type { Message  } from '../../Domain/Entities/MessageTypes';


export type SendMessageImport = Omit<Message, 'timestamp'>;

export const sendMessage = async (data: SendMessageImport): Promise<Message> => {
  const response = await fetch(`${API_URL}/messages/send_message`, {
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
  const response = await fetch(`${API_URL}/messages/global`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get messages');
  }
  
  return response.json();
};

// export const getAllPrivateMessages = async (userId: string): Promise<Message[]> => {
//   const response = await fetch(`${API_URL}/messages/private-messages?userId=${userId}`);
  
//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}));
//     throw new Error(error.error || 'Failed to get private messages');
//   }
  
//   return response.json();
// };

// export const getAllClanMessages = async (clanId: string): Promise<Message[]> => {
//   const response = await fetch(`${API_URL}/messages/clan-messages?clanId=${clanId}`);
  
//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}));
//     throw new Error(error.error || 'Failed to get clan messages');
//   }
  
//   return response.json();
// };

export const deleteMessageById = async (messageId: string): Promise<boolean> => {
  console.log('Deleting message with ID:', messageId);
  const response = await fetch(`${API_URL}/messages/${messageId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to delete message');
  }
  
  return true; 
};

// try catch block