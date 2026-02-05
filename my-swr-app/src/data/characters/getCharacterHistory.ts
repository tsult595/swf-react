import type { LotHistory } from "../../Domain/Entities/CharacterTypes";
import { fetcher } from "../../utils/ApiFetcher";

export async function getCharacterHistory(heroId: number): Promise<LotHistory[]> {
    return fetcher(`/heroes/${heroId}/history`);
}