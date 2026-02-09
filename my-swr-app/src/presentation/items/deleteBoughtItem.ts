
import { ItemUseCases } from "../../Domain";

export async function deleteBoughtItem(userId: string, itemId: number) {
    await ItemUseCases.deleteBoughtItemUseCase(userId, itemId);
}