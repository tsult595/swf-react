
import { FavoritesUseCases } from "../../Domain";

export async function removeFavorites(userId: string, heroId: number) {
    await FavoritesUseCases.removeFromFavoritesUseCase(userId, heroId);
}