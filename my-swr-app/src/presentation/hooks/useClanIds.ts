import { useMemo } from 'react';
import { ClanPresenter } from '..';
import { useUserId } from './useUserId';

export const useClanIds = () => {
  const userId = useUserId();
  const { data: clans } = ClanPresenter.useGetClansByUserId(userId);
  
  return useMemo(
    () => clans?.map((c: any) => c.id || c._id).filter(Boolean) as string[] || [],
    [clans]
  );
};
