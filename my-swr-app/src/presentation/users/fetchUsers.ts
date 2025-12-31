
import useSWR from "swr"
import { UsersUseCases } from "../../Domain";


export function useFetchUsers() {
    return useSWR('users', () => UsersUseCases.fetchUsersUseCase());
}