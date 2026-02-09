const API_URL = '/api/mystery-boxes';

import type { MysteryBox } from "../../Domain/Entities/MystoryBoxTypes";

export async function buyBox(userId: string, boxId: number): Promise<MysteryBox> {  
    try {
        const res = await fetch(`${API_URL}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, boxId })
        });
        if (!res.ok) throw new Error('Failed to buy mystery box');
        return res.json();
    } catch (error) {
        console.error('Error buying mystery box:', error);
        throw error;
    }   
}