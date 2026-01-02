// import { ClanPresenter } from '..';
// import { useChatSocket } from '../hooks/useChatSocket';
// const { sendMessage } = useChatSocket(currentUserId, currentUsername, clanIds, onNewMessage);

//  const handleRemoveUser = async (clanId: string, memberId: string , clanName: string) => {
//     ClanPresenter.removeUserFromClan(clanId, memberId);
//     if (memberId !== ownerId) {
//       sendMessage({
//         text: `Вы были удалены из клана! ${clanName}`,
//         recipientId: memberId,
//         type: 'private',
//       });
//     }
//     mutateClans();
//   };