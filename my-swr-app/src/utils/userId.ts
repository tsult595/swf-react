
export function getOrCreateUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('userId', userId);
  }
  return userId;
}

export async function generatePersonalizedUserId(): Promise<string> {
  const data = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
   
  ].join('|');
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}