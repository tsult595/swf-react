
import { MysteryBoxRepository } from "../../data";

export const  getAllMystoryBoxesUseCase = () => {
  return MysteryBoxRepository.getAllMysteryBoxes();
}