
import { HeroRepository } from "../../data";

export const getHeroByIdUseCase = (heroId: number) => {
  return HeroRepository.getHeroesById(heroId);
}