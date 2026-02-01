import type { Hero } from "../../Domain/Entities/HeroTypes";

export async function getAllHeroes(userId?: string): Promise<Hero[]> {
    const url = userId ? `/api/heroes?userId=${userId}` : '/api/heroes';
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch heroes');
    }

    return response.json();
}
