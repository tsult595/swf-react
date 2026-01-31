import type { LotHistory } from "../Entities/HeroTypes";
import * as HeroRepository from "../../data/heroes";

export async function getHeroHistoryUseCase(heroId: number): Promise<LotHistory[]> {
    return HeroRepository.getHeroHistory(heroId);
}