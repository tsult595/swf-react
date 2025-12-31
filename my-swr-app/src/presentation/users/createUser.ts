
import { UsersUseCases } from "../../Domain";
import type { UserInfo } from "../../Domain/Entities/UserType";

export async function createUser(user: UserInfo) {
    await UsersUseCases.createUserUseCase(user);
}