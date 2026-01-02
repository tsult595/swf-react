import { useState, useEffect } from 'react';
import { generatePersonalizedUserId } from '../../utils/userId';

export const useUserId = () => {
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    async function getUserId() {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = await generatePersonalizedUserId();
        localStorage.setItem('userId', userId);
      }
      setCurrentUserId(userId);
    }
    getUserId();
  }, []);

  return currentUserId;
};