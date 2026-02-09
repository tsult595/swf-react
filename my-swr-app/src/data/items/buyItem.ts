const API_URL = '/api/items';

export async function buyItem(userId: string, itemId: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/user-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId })
    });
    
    if (!res.ok) throw new Error('Failed to buy item');
  } catch (error) {
    console.error('Error buying item:', error);
    throw error;
  }
}