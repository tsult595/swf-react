const API_URL = '/api/items';

export async function buyItem(userId: string, itemId: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/user-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId })
    });
    
    if (!res.ok) throw new Error('Failed to buy item');
    if (res.status === 500) {
      throw new Error('Server cannot find item or user');
    }
    if (res.status === 404 || res.status === 400) {
      throw new Error('Item or user not found');
    }
  } catch (error) {
    console.error('Error buying item:', error);
    throw error;
  }
}


// todo sdelat errori bolwe informativnimi
// todo sozdat kollekciyu magazine v monqo pole > item > id , isAvailavle , quantity, price,