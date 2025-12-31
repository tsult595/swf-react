

import { ClanRepository } from "../../data";

export const removeUserFromClanUseCase = (clanId: string, userId: string) => {
  return ClanRepository.removeUserFromClan(clanId, userId);
}