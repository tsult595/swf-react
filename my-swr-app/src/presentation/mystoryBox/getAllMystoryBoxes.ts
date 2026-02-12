
import useSWR from 'swr';

import { MysteryBoxUseCases } from "../../Domain";

export function useGetAllMystoryBoxes(page: number = 1, limit: number = 4) {
    return useSWR(`mystery-boxes?page=${page}&limit=${limit}`, () => MysteryBoxUseCases.getAllMystoryBoxesUseCase(page, limit));
}