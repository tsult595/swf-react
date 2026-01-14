
import useSWR from 'swr';

import { MysteryBoxUseCases } from "../../Domain";

export function useGetAllMystoryBoxesById(boxIds: string) {
    return useSWR('mystery-boxes', () => MysteryBoxUseCases.getAllMystoryBoxesByIdUseCase(boxIds));
}