// src/Domain/publicChat/getAllPublicMessagesUseCase.ts

import { fetchAllMessages } from '../../data/publicChat/fetchAllMessages';
import type { Message } from '../Entities/MessageTypes';

export async function getAllPublicMessagesUseCase(): Promise<Message[]> {
  const messages = await fetchAllMessages();

  // Здесь можно сортировать, фильтровать и т.д.
  return messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

