import { useEffect } from 'react';
import { generatePersonalizedUserId } from '../../utils/userId';
import { createUser } from '../../data/api/userApi';
import type { UserInfo } from '../../Domain/Entities/UserType';

function getUserInfo(): Omit<UserInfo, 'id'> {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    location: null, 
  };
}
console.log('User Info:', getUserInfo());

export function useAnonymousUser() {
  useEffect(() => {
    async function registerUser() {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = await generatePersonalizedUserId();
        localStorage.setItem('userId', userId);
      }
      const user: UserInfo = { id: userId, ...getUserInfo() };
      createUser(user).catch(console.error);
    }
    registerUser();
  }, []);
}