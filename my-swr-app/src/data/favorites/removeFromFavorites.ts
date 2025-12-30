const API_URL = 'http://localhost:3001/api';

export const removeFromFavorites = async (userId: string, heroId: number) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, heroId })
  });
  
  if (!response.ok) throw new Error('Failed to remove favorite');
  return response.json();
};