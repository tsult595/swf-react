
import { ClansUseCases } from "../../Domain";

export async function removeUserFromClan(clanId: string, userId: string) {
    await ClansUseCases.removeUserFromClanUseCase(clanId, userId);
}
