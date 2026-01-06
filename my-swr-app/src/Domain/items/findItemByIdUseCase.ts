
import { ClanRepository } from "../../data";

export const findItemByIdUseCase = (itemId: string) => {
  return ClanRepository.getClansByUserId(itemId);
}
