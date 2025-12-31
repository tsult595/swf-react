
import { ClanRepository } from "../../data";

export const createClanUseCase = (clanName: string, userIds: string[], ownerId: string) => {
  return ClanRepository.createClan(clanName, userIds, ownerId);
}