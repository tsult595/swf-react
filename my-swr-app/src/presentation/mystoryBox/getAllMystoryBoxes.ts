
import useSWR from 'swr';

import { MysteryBoxUseCases } from "../../Domain";

export function useGetAllMystoryBoxes() {
    return useSWR('mystery-boxes', MysteryBoxUseCases.getAllMystoryBoxesUseCase);
}