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