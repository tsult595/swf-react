const API_URL = 'http://localhost:3001/api';

export const getUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};