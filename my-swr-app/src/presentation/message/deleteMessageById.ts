
import { MessageUseCases } from "../../Domain";


export async function deleteMessageById(messageId: string) {
    await MessageUseCases.deleteMessageByIdUseCase.deleteMessageByIdUseCase(messageId);
}