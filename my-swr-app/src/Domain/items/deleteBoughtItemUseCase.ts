
import { ItemRepository } from '../../data';

export const deleteBoughtItemUseCase = async (userId: string, itemId: number) => {
  await ItemRepository.deleteBoughtItem(userId, itemId);
}