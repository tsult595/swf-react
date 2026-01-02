// import { ClanPresenter } from '..';
// import { useChatSocket } from '../hooks/useChatSocket';
// const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage);

// const handleAddUser = async (clanId: string, userId: string, clanName: string) => {
//     ClanPresenter.addUserToClan(clanId, userId);
//     sendMessage({
//       text: `Вы были добавлены в клан ${clanName}!`,
//       recipientId: userId,
//       type: 'private',
//     });
//     mutateClans();
//   };