

export async function getClansByUserId(userId: string) {
  const response = await fetch(`http://localhost:3001/api/clans/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch clans by userId');
  return response.json();
}