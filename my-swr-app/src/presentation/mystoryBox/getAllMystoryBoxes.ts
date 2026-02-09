
import useSWR from 'swr';

import { MysteryBoxUseCases } from "../../Domain";

export function useGetAllMystoryBoxes(userId: string) {
    return useSWR('mystery-boxes', () => MysteryBoxUseCases.getAllMystoryBoxesUseCase(userId));
}