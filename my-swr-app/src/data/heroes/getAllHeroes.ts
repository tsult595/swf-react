import type { Hero } from "../../Domain/Entities/HeroTypes";

export async function getAllHeroes(): Promise<Hero[]> {
    const response = await fetch('/api/heroes');
    
    if (!response.ok) {
        throw new Error('Failed to fetch heroes');
    }
    
    return response.json();
}
