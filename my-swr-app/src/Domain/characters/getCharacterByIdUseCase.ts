
import {CharacterRepository } from "../../data";

export const getCharacterByIdUseCase = (heroId: number) => {
  return CharacterRepository.getCharacterById(heroId);
}