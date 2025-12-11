const API_URL = 'http://localhost:3001/api';

export const fetcher = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}; 