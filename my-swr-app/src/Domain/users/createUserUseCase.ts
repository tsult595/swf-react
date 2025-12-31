
import { UserRepository } from "../../data";
import type { UserInfo } from "../Entities/UserType";

export const createUserUseCase = (user : UserInfo) => {
  return UserRepository.createUser(user);
}