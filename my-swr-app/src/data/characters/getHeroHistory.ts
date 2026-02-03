import type { LotHistory } from "../../Domain/Entities/HeroTypes";
import { fetcher } from "../../utils/ApiFetcher";

export async function getHeroHistory(heroId: number): Promise<LotHistory[]> {
    return fetcher(`/heroes/${heroId}/history`);
}