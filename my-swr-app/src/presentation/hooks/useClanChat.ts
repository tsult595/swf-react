import useSWR from 'swr';

export const useClanChat = () => {
  const { data: clanChatId = null, mutate: mutateClanChatId } = useSWR<string | null>(
    'clanChatId', 
    null, 
    { fallbackData: localStorage.getItem('clanChatId') }
  );
  const { data: clanName = null, mutate: mutateClanName } = useSWR<string | null>(
    'clanName', 
    null, 
    { fallbackData: localStorage.getItem('clanName') }
  );
  
  return { clanChatId, clanName, mutateClanChatId, mutateClanName };
};