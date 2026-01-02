
const API_URL = '/api/clans';

export async function deleteClan(clanId: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${clanId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete clan');
  } catch (error) {
    console.error('Error deleting clan:', error);
    throw error;
  }
}