
import { MysteryBoxUseCases } from "../../Domain";


export async function deleteBoughtBox(userId: string, boxId: number) {
    await MysteryBoxUseCases.deleteBoughtBoxUseCase(userId, boxId);
}