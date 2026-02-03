import type { LotHistory } from "../Entities/HeroTypes";
import * as CharacterRepository from "../../data/characters";

export async function getHeroHistoryUseCase(heroId: number): Promise<LotHistory[]> {
    return CharacterRepository.getHeroHistory(heroId);
}