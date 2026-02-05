import type { Character } from "../../Domain/Entities/CharacterTypes";

export async function getAllCharacters(userId?: string): Promise<Character[]> {
    const url = userId ? `/api/heroes?userId=${userId}` : '/api/heroes';
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch heroes');
    }

    return response.json();
}
