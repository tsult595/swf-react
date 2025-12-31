
const API_URL = '/api/clans';

export async function getAllClans(): Promise<ClanDocument[]> {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error('Failed to fetch all clans');
  return res.json();
}