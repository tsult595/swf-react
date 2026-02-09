
import { ItemRepository } from '../../data';

export const buyItemUseCase = async (userId: string, itemId: number) => {
  await ItemRepository.buyItem(userId, itemId);
}