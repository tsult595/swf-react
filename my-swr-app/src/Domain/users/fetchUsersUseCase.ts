
import { UserRepository } from "../../data";

export const fetchUsersUseCase = () => {
  return UserRepository.getAllUsers();
}