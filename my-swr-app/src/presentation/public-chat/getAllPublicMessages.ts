// tut obrabativayutsa tolko ui dannie o otpravlayutsa v componente

import type { Message } from '../../Domain/Entities/MessageTypes';
import { getAllPublicMessagesUseCase } from '../../Domain/publicChat/fetchAllMessages';


type LoadingCallback = (loading: boolean) => void;
type ErrorCallback = (errorText: string) => void;
type MessagesCallback = (messages: Message[]) => void;

export async function getAllPublicMessagesForUI(
  onLoading: LoadingCallback,
  onError: ErrorCallback,
  onMessages: MessagesCallback
): Promise<Message[]> {
  try {
    onLoading(true);

    const messages = await getAllPublicMessagesUseCase();

    onLoading(false);
    onMessages(messages);
    return messages;
  } catch (error) {
    onLoading(false);
    onMessages([]);

    const errorText = error instanceof Error ? error.message : 'Неизвестная ошибка';
    onError(errorText);

    throw error; // если хочешь пробросить дальше
  }
}
