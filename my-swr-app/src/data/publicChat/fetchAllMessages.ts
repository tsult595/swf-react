// tut napisat htpp zapros fetch na polucenie vsex soobweniy iz servera eto uroven repositoriya

import type { Message } from '../../Domain/Entities/MessageTypes';

const API_URL = 'http://localhost:3001/api';

export async function fetchAllMessages(): Promise<Message[]> {
  try {
    const response = await fetch(`${API_URL}/messages/global`);
    
    const messages: Message[] = await response.json();
    console.log('Fetched messages!!:', messages);
    return messages;
  } catch (error) {
    console.error('Error fetching all messages:', error);
    throw error;
  }
}