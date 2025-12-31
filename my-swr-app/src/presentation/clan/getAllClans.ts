
import useSWR from "swr"
import { ClansUseCases } from "../../Domain";

export function useGetAllClans() {
    return useSWR('all-clans', () => ClansUseCases.getAllClansUseCase());
}


