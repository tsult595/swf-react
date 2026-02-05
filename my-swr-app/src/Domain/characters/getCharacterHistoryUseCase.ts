import type { LotHistory } from "../Entities/CharacterTypes";
import * as CharacterRepository from "../../data/characters";

export async function getCharacterHistoryUseCase(heroId: number): Promise<LotHistory[]> {
    return CharacterRepository.getCharacterHistory(heroId);
}