
const API_URL = '/api/clans';
import type { ClanDocument } from '../../Domain/Entities/ClanTypes';

export async function getAllClans(): Promise<ClanDocument[]> {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error('Failed to fetch all clans');
    return res.json();
  } catch (error) {
    console.error('Error fetching all clans:', error);
    throw error;
  }
}