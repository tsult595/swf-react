
import { ItemRepository } from '../../data';

export const findAllItemsUseCase = () => {
  return ItemRepository.findAllItems();
}