
import { ClanRepository } from "../../data";

export const getAllClansUseCase = () => {
  return ClanRepository.getAllClans();
}