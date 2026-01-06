
const API_URL = '/api/items';


import type { Item } from "../../Domain/Entities/enums/ItemsTypes";

export async function findAllItems(): Promise<Item[]> {
  try {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error('Failed to fetch all clans'); 
  return res.json();
  } catch (error) {
    console.error('Error fetching all items:', error); 
    throw error;
  }
}
  