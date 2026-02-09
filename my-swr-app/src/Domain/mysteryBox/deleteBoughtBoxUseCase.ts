
import { MysteryBoxRepository } from '../../data';

export const deleteBoughtBoxUseCase = async (userId: string, boxId: number) => {
  await MysteryBoxRepository.deleteBoughtBox(userId, boxId);
}