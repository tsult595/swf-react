import { ClanPresenter } from "..";

export const useClanAddRemove = (
  ownerId: string,
  sendMessage: (msg: { text: string; recipientId: string; type: 'private' }) => void,
  mutateClans: () => void,

  onAddUser?: (clanId: string, userId: string, clanName: string) => void,
  onRemoveUser?: (clanId: string, memberId: string, clanName: string) => void
) => {
  const handleAddUser = async (clanId: string, userId: string, clanName: string) => {
   await ClanPresenter.addUserToClan(clanId, userId);
    sendMessage({ text: `Вы были добавлены в клан ${clanName}!`, recipientId: userId, type: 'private' });
    mutateClans();
   
    onAddUser?.(clanId, userId, clanName);
  };

  const handleRemoveUser = async (clanId: string, memberId: string, clanName: string) => {
   await ClanPresenter.removeUserFromClan(clanId, memberId);
    if (memberId !== ownerId) {
      sendMessage({ text: `Вы были удалены из клана! ${clanName}`, recipientId: memberId, type: 'private' });
    }
    mutateClans();
   
    onRemoveUser?.(clanId, memberId, clanName);
  };

  return { handleAddUser, handleRemoveUser };
};