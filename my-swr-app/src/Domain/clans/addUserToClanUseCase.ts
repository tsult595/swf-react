
import { ClanRepository } from "../../data";

export const addUserToClanUseCase = (clanId: string, userId: string) => {
  return ClanRepository.addUserToClan(clanId, userId);
}