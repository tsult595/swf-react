import type { Hero } from "../Entities/HeroTypes";
import * as HeroRepository from "../../data/heroes";

export async function getAllHeroesUseCase(userId?: string): Promise<Hero[]> {
    return HeroRepository.getAllHeroes(userId);
}
