
import { FavoritesUseCases } from "../../Domain";

// todo prettier i linter (pri soxranenii cntr s doljen avtomatom zapuskatsa linter i prettier)


export async function toggleFavorites(userId: string, heroId: number, isCurrentlyFavorite: boolean) {
    await FavoritesUseCases.toggleFavoriteUseCase(userId, heroId, isCurrentlyFavorite);
}

