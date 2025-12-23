// eto uroven use case tut mi vizivaem data uroven (repositorii) esli nijno preobrazovivaem i otpravlaem v presenter

import { fetchAllMessages } from '../../data/publicChat/fetchAllMessages';
import type { Message } from '../../Domain/Entities/MessageTypes';

export async function getAllPublicMessagesUseCase(): Promise<Message[]> {
    
return fetchAllMessages();
 
} 

