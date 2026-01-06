
import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";

export function useGetAllItems() {
    return useSWR('items', ItemUseCases.findAllItemsUseCase);
}
