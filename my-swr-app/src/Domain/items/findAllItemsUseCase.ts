
import { ItemRepository } from '../../data';

export const findAllItemsUseCase = (currentPage, limit) => {
  return ItemRepository.findAllItems(currentPage, limit);
}