
import type { UserInfo } from "../../Domain/Entities/UserType";
import { getAllUsersUseCase } from "../../Domain/allUsers/fetchAllUsers";

export async function getAllUsersForUI(shouldShowErrorPopUp: (errorText: string) => void , shouldShowUsers: (users: UserInfo[]) => void, shouldLoading: (loading: boolean) => void): Promise<UserInfo[]> {
    try {
        shouldLoading(true);
        const users = await getAllUsersUseCase();
        shouldLoading(false);
        shouldShowUsers(users);
        return users;
    } catch (error) {
        shouldLoading(false);
        shouldShowUsers([]);
        shouldShowErrorPopUp(error instanceof Error ? error.message : 'Неизвестная ошибка');
        throw error;
    }
}