
const API_URL = 'http://localhost:3001/api';

export const getUserFavorites = async (userId: string) => {
  const response = await fetch(`${API_URL}/favorites/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
};