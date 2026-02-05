import type {Character } from "../../Domain/Entities/CharacterTypes";

const API_URL = '/api/heroes';

export async function getCharacterById(heroId: number): Promise<Character> {
    try {
        const response = await fetch(`${API_URL}/${heroId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch hero: ${response.status} ${response.statusText}`);
        }
        const hero: Character = await response.json();
        return hero;
    } catch (error) {
        console.error('Error fetching hero by ID:', error);
        throw error; // Перебрасываем ошибку для обработки выше
    }   
}