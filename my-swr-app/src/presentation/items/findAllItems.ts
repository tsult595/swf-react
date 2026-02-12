
import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";
import type { Item } from '../../Domain/Entities/ItemsTypes';

export function useGetAllItems(currentPage: number, limit: number) {
    return useSWR<{ items: Item[], total: number }>(['items', currentPage, limit], () => ItemUseCases.findAllItemsUseCase(currentPage, limit));
}
