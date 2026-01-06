import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";

export function useGetItemById(id: string) {
    return useSWR(id ? `item-${id}` : null, () => ItemUseCases.findItemByIdUseCase(id));
}