
import { MysteryBoxRepository } from '../../data';

export const buyBoxUseCase = async (userId: string, boxId: number) => {
  await MysteryBoxRepository.buyBox(userId, boxId);
}