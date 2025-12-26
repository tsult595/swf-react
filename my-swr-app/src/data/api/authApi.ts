// API functions for authentication

const API_URL = 'http://localhost:3001/api/users';

export async function registerUser(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to register: ${error}`);
  }
}

export async function verifyUser(token: string): Promise<{ token: string; user: { id: string; email: string } }> {
  const response = await fetch(`${API_URL}/verify?token=${encodeURIComponent(token)}`, {
    method: 'GET',
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to verify: ${error}`);
  }
  return response.json();
}