
const API_URL = '/api/clans';

export async function addUserToClan(clanId: string, userId: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${clanId}/addUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error('Failed to add user to clan');
  } catch (error) {
    console.error('Error adding user to clan:', error);
    throw error;
  }
}