// src/data/publicChat/fetchAllMessages.ts

import type { Message } from '../../Domain/Entities/MessageTypes';

const API_URL = 'http://localhost:3001/api';

export async function fetchAllMessages(): Promise<Message[]> {
  console.log('Fetching all public messages from API...');
  const response = await fetch(`${API_URL}/messages/global`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Failed to fetch messages:', response.status, errorData);
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  const messages: Message[] = await response.json();
  console.log('Fetched messages:', messages);
  return messages;
}