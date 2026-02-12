
const API_URL = '/api/items';


import type { Item } from "../../Domain/Entities/ItemsTypes";

export async function findAllItems(currentPage: number, limit: number): Promise<{ items: Item[], total: number }> {
  try {
  const res = await fetch(`${API_URL}?page=${currentPage}&limit=${limit}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch all items'); 
  return res.json();
  } catch (error) {
    console.error('Error fetching all items:', error); 
    throw error;
  }
}
  