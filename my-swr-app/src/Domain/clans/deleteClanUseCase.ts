
import { ClanRepository } from "../../data";


export const deleteClanUseCase = (clanId: string) => {
  return ClanRepository.deleteClan(clanId);
}