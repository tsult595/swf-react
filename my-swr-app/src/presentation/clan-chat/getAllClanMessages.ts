
import type { Message } from '../../Domain/Entities/MessageTypes';
import { getAllClanMessagesUseCase } from '../../Domain/clanChat/fetchAllClanMessages';

export async function getAllClanMessagesForUI(clanId: string , shouldShowErrorPopUp: (errorText: string) => void , shouldLoading: (loading: boolean) => void): Promise<Message[]> {

    try {
     return getAllClanMessagesUseCase(clanId);
    } catch (error) {
    console.error('Ошибка в presentation слое:', error);
    shouldLoading(false);
   shouldShowErrorPopUp(error instanceof Error ? error.message : 'Неизвестная ошибка');
    throw error;   
    }
}