
import { getAllPrivateMessages } from "../../data/privateChat/fetchAllPrivateMessage";
import type { Message } from "../Entities/MessageTypes";

export async function getAllPrivateMessagesUseCase(userId: string): Promise<Message[]> {
    return getAllPrivateMessages(userId);
}