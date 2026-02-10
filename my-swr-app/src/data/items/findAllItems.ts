
const API_URL = '/api/items';


import type { Item } from "../../Domain/Entities/ItemsTypes";

export async function findAllItems(): Promise<Item[]> {
  try {
  const res = await fetch(`${API_URL}`, {
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
  