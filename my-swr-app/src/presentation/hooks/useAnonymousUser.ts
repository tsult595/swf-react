import { useEffect } from 'react';
import { getOrCreateUserId } from '../../utils/userId';
import { createUser } from '../../data/api/userApi';

function getUserInfo() {

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    location: navigator.geolocation,
     
  };
}
console.log('User Info:', getUserInfo());

export function useAnonymousUser() {
  useEffect(() => {
    const userId = getOrCreateUserId();
    createUser({
      id: userId,
      ...getUserInfo(),
    }).catch(console.error);
  }, []);
}