import type { Character } from "../Entities/CharacterTypes";
import * as CharacterRepository from "../../data/characters";

export async function getAllCharactersUseCase(userId?: string): Promise<Character[]> {
    return CharacterRepository.getAllCharacters(userId);
}
