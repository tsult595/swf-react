const API_URL = '/api/items';
import type { Item } from "../../Domain/Entities/ItemsTypes";

export async function findItemsByRarity(rarity: string): Promise<Item[]> {
    try {
        const response = await fetch(`${API_URL}/rarity/${rarity}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
        }
        
        const items: Item[] = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items by rarity:', error);
        throw error;
    }
}
