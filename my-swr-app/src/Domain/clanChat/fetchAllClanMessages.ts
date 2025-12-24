
import { getAllClanMessages } from "../../data/clanChat/fetchAllClanMessages";
import type { Message } from "../Entities/MessageTypes";

export async function getAllClanMessagesUseCase(clanId: string): Promise<Message[]> {
    
    return getAllClanMessages(clanId);
}