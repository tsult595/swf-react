
import { MysteryBoxRepository } from "../../data";

export const  getAllMystoryBoxesUseCase = (page: number = 1, limit: number = 4) => {
  return MysteryBoxRepository.getAllMysteryBoxes(page, limit);
}