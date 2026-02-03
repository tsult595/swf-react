import type { Character } from "../Entities/HeroTypes";
import * as CharacterRepository from "../../data/characters";

export async function getAllHeroesUseCase(userId?: string): Promise<Character[]> {
    return CharacterRepository.getAllHeroes(userId);
}
