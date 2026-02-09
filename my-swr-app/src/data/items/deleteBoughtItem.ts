const API_URL = '/api/items';

export async function deleteBoughtItem(userId: string, itemId: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId })
    });
    if (!res.ok) throw new Error('Failed to delete bought item');
    } catch (error) {   
    console.error('Error deleting bought item:', error);
    throw error;
  } 
}