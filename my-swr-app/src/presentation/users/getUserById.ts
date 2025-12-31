
import useSWR from "swr"
import { UsersUseCases } from "../../Domain";

export function useGetUserById(userId: string) {
    return useSWR(
        userId ? `user-${userId}` : null,
        () => UsersUseCases.getUserByIdUseCase(userId)
    );
}
