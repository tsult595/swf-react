
import { FavoritesUseCases } from "../../Domain";

export async function addFavorites(userId: string, heroId: number) {
    await FavoritesUseCases.addToFavoritesUseCase(userId, heroId);
}