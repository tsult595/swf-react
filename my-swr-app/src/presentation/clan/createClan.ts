
import { ClansUseCases } from "../../Domain";

export async function createClan(name: string, members: string[], ownerId: string) {
    return await ClansUseCases.createClanUseCase(name, members, ownerId);
}





