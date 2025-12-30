
const API_URL = 'http://localhost:3001/api';

export const addToFavorites = async (userId: string, heroId: number) => {
    
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, heroId })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add favorite');
  }
  
  return response.json();
};