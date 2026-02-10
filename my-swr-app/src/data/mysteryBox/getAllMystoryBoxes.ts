// const API_URL = '/api/mystery-boxes';
const API_URL = 'http://localhost:3001/api/mystery-boxes';

import type { MysteryBox } from "../../Domain/Entities/MystoryBoxTypes";

export async function getAllMysteryBoxes(): Promise<MysteryBox[]> {
    try {
        const res = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch all mystery boxes'); 
        return res.json();
    } catch (error) {
       console.log('error fetching boxes:', error);
       throw error; 
    }
}