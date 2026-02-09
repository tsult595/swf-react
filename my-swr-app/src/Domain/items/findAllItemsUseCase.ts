
import { ItemRepository } from '../../data';

export const findAllItemsUseCase = (userId: string) => {
  return ItemRepository.findAllItems(userId);
}