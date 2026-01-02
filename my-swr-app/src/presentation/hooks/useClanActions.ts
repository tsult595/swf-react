import { ClanPresenter } from "..";

export const useClanActions = (
  ownerId: string,
  sendMessage: (msg: { text: string; recipientId: string; type: 'private' }) => void,
  mutateClans: () => void
) => {
  const handleAddUser = async (clanId: string, userId: string, clanName: string) => {
    ClanPresenter.addUserToClan(clanId, userId);
    sendMessage({
      text: `Вы были добавлены в клан ${clanName}!`,
      recipientId: userId,
      type: 'private',
    });
    mutateClans();
  };

  const handleRemoveUser = async (clanId: string, memberId: string, clanName: string) => {
    ClanPresenter.removeUserFromClan(clanId, memberId);
    if (memberId !== ownerId) {
      sendMessage({
        text: `Вы были удалены из клана! ${clanName}`,
        recipientId: memberId,
        type: 'private',
      });
    }
    mutateClans();
  };

  return { handleAddUser, handleRemoveUser };
};