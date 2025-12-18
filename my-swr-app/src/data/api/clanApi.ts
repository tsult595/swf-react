// Получить кланы по userId (новый эндпоинт)

import type { ClanDocument } from '../../Domain/Entities/ClanTypes';

const API_URL = '/api/clans';

export async function getClansByUserId(userId: string) {
  const response = await fetch(`http://localhost:3001/api/clans/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch clans by userId');
  return response.json();
}


export async function getMyClans(userId: string): Promise<ClanDocument[]> {
  const res = await fetch(`${API_URL}/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch clans');
  return res.json();
}

export async function addUserToClan(clanId: string, userId: string): Promise<void> {
  const res = await fetch(`${API_URL}/${clanId}/addUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error('Failed to add user to clan');
}

export async function deleteClan(clanId: string): Promise<void> {
  const res = await fetch(`${API_URL}/${clanId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete clan');
}
    

export const removeUserFromClan = async (clanId: string, userId: string) => {
  const response = await fetch(`http://localhost:3001/api/clans/${clanId}/remove-member`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to remove user from clan');
  return response.json();
};



export const createClan = async (clanName: string, userIds: string[], ownerId: string) => {
  const response = await fetch('http://localhost:3001/api/clans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: clanName, members: userIds, ownerId }),
  });
  if (!response.ok) throw new Error('Failed to create clan');
  return response.json();
};