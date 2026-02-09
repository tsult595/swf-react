

const API_URL = '/api/items';
import type { Item } from "../../Domain/Entities/ItemsTypes";

export async function findItemById(itemId: string): Promise<Item> {
    try {
        const response = await fetch(`${API_URL}/${itemId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch item: ${response.status} ${response.statusText}`);
        }
        
        const item: Item = await response.json();
        return item;
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        throw error; // Перебрасываем ошибку для обработки выше
    }
}