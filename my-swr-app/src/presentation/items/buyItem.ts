
import { ItemUseCases } from "../../Domain";

export async function buyItem(userId: string, itemId: number) {
    await ItemUseCases.buyItemUseCase(userId, itemId);
}