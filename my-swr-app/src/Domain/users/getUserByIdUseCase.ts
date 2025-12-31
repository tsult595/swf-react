
import { UserRepository } from "../../data";

export const getUserByIdUseCase = (userId: string) => {
  return UserRepository.getUser(userId);
}