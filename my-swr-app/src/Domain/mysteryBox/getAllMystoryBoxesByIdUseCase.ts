
import { MysteryBoxRepository } from "../../data";

export const getAllMystoryBoxesByIdUseCase = (boxIds: string) => {
  return MysteryBoxRepository.getAllMysteryBoxesById(boxIds);
}