import useSWR from 'swr';
import { ItemUseCases } from "../../Domain";

export function useGetItemsByRarity(rarity: string) {
    return useSWR(rarity ? `items-rarity-${rarity}` : null, () => ItemUseCases.findItemsByRarityUseCase(rarity));
}