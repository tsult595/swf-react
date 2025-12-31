

import { ClanRepository } from "../../data";

export const getClansByUserIdUseCase = (userId: string) => {
  return ClanRepository.getClansByUserId(userId);
}