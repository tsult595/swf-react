
import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";
import type { Item } from '../../Domain/Entities/ItemsTypes';

export function useGetAllItems() {
    return useSWR<Item[]>(['items'], () => ItemUseCases.findAllItemsUseCase());
}
