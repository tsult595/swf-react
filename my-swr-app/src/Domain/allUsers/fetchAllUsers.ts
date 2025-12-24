
import { getAllUsers } from "../../data/allUsers/fetchAllUsers";
import type { UserInfo } from "../Entities/UserType";

export async function getAllUsersUseCase(): Promise<UserInfo[]> {
  return getAllUsers();
}