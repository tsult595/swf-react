
import { FavoritesUseCases } from "../../Domain";


export async function toggleFavorites(userId: string, heroId: number, isCurrentlyFavorite: boolean) {
    await FavoritesUseCases.toggleFavoriteUseCase(userId, heroId, isCurrentlyFavorite);
}

