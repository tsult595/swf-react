
import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";
import type { Item } from '../../Domain/Entities/ItemsTypes';

export function useGetAllItems(userId: string) {
    return useSWR<Item[]>(['items', userId], () => ItemUseCases.findAllItemsUseCase(userId));
}
