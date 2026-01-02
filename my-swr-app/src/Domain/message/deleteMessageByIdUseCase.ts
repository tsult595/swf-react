
import { MessageRepository } from "../../data";

export const deleteMessageByIdUseCase = (messageId: string) => {
    return MessageRepository.deleteMessageById(messageId);
}