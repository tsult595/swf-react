
import {CharacterRepository } from "../../data";

export const getHeroByIdUseCase = (heroId: number) => {
  return CharacterRepository.getHeroesById(heroId);
}