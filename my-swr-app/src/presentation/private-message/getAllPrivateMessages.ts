

import type { Message } from '../../Domain/Entities/MessageTypes';
import { getAllPrivateMessagesUseCase } from '../../Domain/privateChat/fetchAllPrivateMessages';

export async function getAllPrivateMessagesForUI(userId: string , shouldShowErrorPopUp: (errorText: string) => void , shouldLoading: (loading: boolean) => void): Promise<Message[]> {
    try {
        shouldLoading(true);
        const messages = await getAllPrivateMessagesUseCase(userId);
        shouldLoading(false);
        return messages;
    } catch (error) {
        shouldLoading(false);
        shouldShowErrorPopUp(error instanceof Error ? error.message : 'Неизвестная ошибка');
        throw error;
    }
}