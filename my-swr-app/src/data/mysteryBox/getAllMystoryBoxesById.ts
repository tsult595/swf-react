
import type { MysteryBox } from "../../Domain/Entities/MystoryBoxTypes";

const API_URL = '/api/mystery-boxes';

export async function getAllMysteryBoxesById(boxIds: string): Promise<MysteryBox[]> {
    try {
        const response = await fetch(`${API_URL}/${boxIds}`);
        if (!response.ok) throw new Error('Failed to fetch all mystery boxes');
        return response.json();
    } catch (error) {
        console.log('error fetching boxes:', error);
        throw error;
    }
}

