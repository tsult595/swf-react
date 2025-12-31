import useSWR from "swr"
import { ClansUseCases } from "../../Domain";

export function useGetClansByUserId(userId: string) {
    return useSWR(
        userId ? `clans-${userId}` : null,
        () => ClansUseCases.getClansByUserIdUseCase(userId)
    );
}