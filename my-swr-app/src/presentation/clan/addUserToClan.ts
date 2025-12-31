
import { ClansUseCases } from "../../Domain";

export async function addUserToClan(clanId: string, userId: string) {
    await ClansUseCases.addUserToClanUseCase(clanId, userId);
}

