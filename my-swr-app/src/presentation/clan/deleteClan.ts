
import { ClansUseCases } from "../../Domain";

export async function deleteClan(clanId: string) {
    await ClansUseCases.deleteClanUseCase(clanId);
}