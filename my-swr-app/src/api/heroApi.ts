
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

export const removeFromFavorites = async (userId: string, heroId: number) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, heroId })
  });
  
  if (!response.ok) throw new Error('Failed to remove favorite');
  return response.json();
};

export const getUserFavorites = async (userId: string) => {
  const response = await fetch(`${API_URL}/favorites/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
};