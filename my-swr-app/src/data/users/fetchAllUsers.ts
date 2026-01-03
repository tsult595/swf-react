import type { UserInfo } from "../../Domain/Entities/UserType";

const API_URL = 'http://localhost:3001/api';

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};