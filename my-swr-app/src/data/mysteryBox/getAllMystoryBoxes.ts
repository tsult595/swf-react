// const API_URL = '/api/mystery-boxes';
const API_URL = 'http://localhost:3001/api/mystery-boxes';

import type { MysteryBox } from "../../Domain/Entities/MystoryBoxTypes";

export async function getAllMysteryBoxes(page: number = 1, limit: number = 4): Promise<{ items: MysteryBox[], total: number }> {
    try {
        const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
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