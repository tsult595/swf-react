

export const createClan = async (clanName: string, userIds: string[], ownerId: string) => {
  try {
    const response = await fetch('http://localhost:3001/api/clans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: clanName, members: userIds, ownerId }),
    });
    if (!response.ok) throw new Error('Failed to create clan');
    return response.json();
  } catch (error) {
    console.error('Error creating clan:', error);
    throw error;
  }
};