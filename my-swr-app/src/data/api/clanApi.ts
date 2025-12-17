// src/data/api/clanApi.ts
export const createClan = async (clanName: string, userIds: string[]) => {
  const response = await fetch('http://localhost:3001/api/clans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: clanName, members: userIds }),
  });
  if (!response.ok) throw new Error('Failed to create clan');
  return response.json(); // возвращает созданный клан с id
};