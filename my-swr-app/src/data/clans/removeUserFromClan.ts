

export const removeUserFromClan = async (clanId: string, userId: string) => {
  const response = await fetch(`http://localhost:3001/api/clans/${clanId}/remove-member`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to remove user from clan');
  return response.json();
};