import type { UserInfo } from "../../Domain/Entities/UserType";

const API_URL = 'http://localhost:3001/api';

export const createUser = async (user: UserInfo) => {

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

export const getUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

// export const getAllUsers = async (): Promise<UserInfo[]> => {
//   const response = await fetch(`${API_URL}/users`);
//   if (!response.ok) throw new Error('Failed to fetch users');
//   return response.json();
// };

