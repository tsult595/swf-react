// tut obrabativayutsa tolko ui dannie o otpravlayutsa v componente

import type { Message } from '../../Domain/Entities/MessageTypes';
import { getAllPublicMessagesUseCase } from '../../Domain/publicChat/fetchAllMessages';


export async function getAllPublicMessagesForUI(shouldShowErrorPopUp: (errorText: string) => void ,

 shouldLoading: (loading: boolean) => void): Promise<Message[]> {

  try {
    return await getAllPublicMessagesUseCase();
  } catch (error) {
    console.error('Ошибка в presentation слое:', error);
    shouldLoading(false);
    // shouldShowMessages([]);
    shouldShowErrorPopUp(error instanceof Error ? error.message : 'Неизвестная ошибка');
    throw error; 
  }
} 
