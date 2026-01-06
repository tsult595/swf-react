
import { ClanRepository } from "../../data";

export const findItemsByRarityUseCase = (rarity: string) => {
  return ClanRepository.getClansByUserId(rarity);
}