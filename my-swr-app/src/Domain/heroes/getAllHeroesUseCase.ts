import type { Character } from "../Entities/HeroTypes";
import * as HeroRepository from "../../data/heroes";

export async function getAllHeroesUseCase(userId?: string): Promise<Character[]> {
    return HeroRepository.getAllHeroes(userId);
}
