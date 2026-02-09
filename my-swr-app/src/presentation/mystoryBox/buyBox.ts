
import { MysteryBoxUseCases } from "../../Domain";


export async function buyBox(userId: string, boxId: number) {
    await MysteryBoxUseCases.buyBoxUseCase(userId, boxId);
}