import { getClansByUserId } from "../../data/api/clanApi";
import type { ClanDocument } from "../Entities/ClanTypes";

export async function getClansUseCase(userId: string): Promise<ClanDocument[]> {
  return getClansByUserId(userId);
}