
import { MysteryBoxRepository } from "../../data";

export const  getAllMystoryBoxesUseCase = (userId: string) => {
  return MysteryBoxRepository.getAllMysteryBoxes(userId);
}